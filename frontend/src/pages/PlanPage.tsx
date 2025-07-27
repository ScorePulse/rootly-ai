import React, { useState, useCallback, useRef } from "react";
// Import the streaming function
import { sendMessageStream } from "../api";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const PlanPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to store the index of the bot message being streamed to
  // This is crucial because `onData`, `onError` will not re-render every time
  // `messages` or `currentBotMessageIndex` state updates inside `handleSend`.
  // A ref will give them the *current* mutable value without re-creating the callbacks.
  const currentBotMessageIndexRef = useRef<number | null>(null);

  // Callbacks for streaming - defined at the top level
  const onData = useCallback(
    (chunk: string) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        // Use the ref's current value for the index
        const indexToUpdate = currentBotMessageIndexRef.current;
        if (indexToUpdate !== null && updatedMessages[indexToUpdate]) {
          updatedMessages[indexToUpdate].text += chunk;
        }
        return updatedMessages;
      });
    },
    [] // No dependencies needed for onData because it uses the functional update form of setMessages
  );

  const onError = useCallback(
    (err: Error) => {
      console.error("Stream Error:", err);
      setError(err.message || "An unknown error occurred during streaming.");
      setIsStreaming(false);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const indexToUpdate = currentBotMessageIndexRef.current;
        if (indexToUpdate !== null && updatedMessages[indexToUpdate]) {
          updatedMessages[indexToUpdate].text += `\n[ERROR: ${
            err.message || "Streaming error."
          }]`;
        }
        return updatedMessages;
      });
      currentBotMessageIndexRef.current = null; // Clear the ref on error
    },
    [] // No dependencies needed for onError as it uses functional updates and a ref
  );

  const onComplete = useCallback(() => {
    setIsStreaming(false);
    currentBotMessageIndexRef.current = null; // Clear the ref on complete
    console.log("Stream completed!");
  }, []);

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();
    if (trimmedInput === "" || isStreaming) return;

    // 1. Add user message
    const userMessage: Message = { text: trimmedInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsStreaming(true);
    setError(null);

    // 2. Add an empty placeholder for the bot's response
    // Calculate the index for the new bot message *before* updating state,
    // then use this to set the ref.
    const newBotMessageIndex = messages.length + 1; // Correct index after adding user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "", sender: "bot" },
    ]);
    currentBotMessageIndexRef.current = newBotMessageIndex; // Set the ref

    try {
      // 3. Start the streaming process
      await sendMessageStream(trimmedInput, onData, onError, onComplete);
    } catch (initialError: any) {
      console.error("Initial stream setup error:", initialError);
      setError(initialError.message || "Failed to initiate chat stream.");
      setIsStreaming(false);
      currentBotMessageIndexRef.current = null;

      // Remove the empty bot placeholder if the stream didn't even begin
      setMessages((prevMessages) =>
        prevMessages.slice(0, prevMessages.length - 1)
      );

      // Add a single error message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `Error: ${initialError.message || "Could not get a response."}`,
          sender: "bot",
        },
      ]);
    }
  }, [input, isStreaming, messages.length, onData]);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index} // Consider using a more stable key if messages can be reordered/deleted
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-3 my-1 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {/* Optional: Show "Bot is typing..." indicator */}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md p-3 my-1 rounded-lg bg-gray-200 text-gray-600 italic">
              Bot is generating...
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 p-2 mb-2 bg-red-100 rounded">{error}</div>
      )}

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder={isStreaming ? "Please wait..." : "Type your message..."}
          disabled={isStreaming}
        />
        <button
          onClick={handleSend}
          className={`p-2 rounded-r-lg ${
            isStreaming || !input.trim()
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={isStreaming || !input.trim()}
        >
          {isStreaming ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default PlanPage;
