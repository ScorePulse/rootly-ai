import axios from "axios";
import { auth } from "../firebase";

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add an interceptor to include the Firebase authentication token in every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API (example, based on context that suggests user creation)
export const createUserDocument = (userData: {
  uid: string;
  name: string;
  email: string;
}) => {
  return api.post("/users/create", userData);
};

// Student API
export const getAllStudents = () => api.get("/students");
export const getStudentById = (id: string) => api.get(`/students/${id}`);
export const createStudent = (data: any) => api.post("/students", data);
export const updateStudent = (id: string, data: any) =>
  api.put(`/students/${id}`, data);
export const deleteStudent = (id: string) => api.delete(`/students/${id}`);

// Teacher API
export const getAllTeachers = () => api.get("/teachers");
export const getTeacherById = (id: string) => api.get(`/teachers/${id}`);
export const createTeacher = (data: any) => api.post("/teachers", data);
export const updateTeacher = (id: string, data: any) =>
  api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id: string) => api.delete(`/teachers/${id}`);

// Define types for the streaming callback functions
type OnStreamDataCallback = (chunk: string) => void;
type OnStreamErrorCallback = (error: Error) => void;
type OnStreamCompleteCallback = () => void;

// Path to your streaming endpoint
const STREAM_API_PATH = "/chat/chat";

/**
 * Sends a message to a streaming API endpoint and processes the streamed response.
 * This function handles Server-Sent Events (SSE) like data formats within an Axios onDownloadProgress callback.
 *
 * @param message The user's message to send.
 * @param onData Callback function to be called with each data chunk received.
 * @param onError Callback function to be called if an error occurs during streaming.
 * @param onComplete Callback function to be called when the stream completes (successfully or with an error).
 */
export const sendMessageStream = async (
  message: string,
  onData: OnStreamDataCallback,
  onError: OnStreamErrorCallback,
  onComplete: OnStreamCompleteCallback
) => {
  // `lastProcessedIndex` tracks the character index up to which `responseText` has been processed.
  let lastProcessedIndex = 0;
  // `lineBuffer` accumulates partial lines that might be split across `onDownloadProgress` calls.
  let lineBuffer = "";

  try {
    await api.post(
      STREAM_API_PATH,
      { message }, // Assuming the backend expects a 'prompt' field
      {
        responseType: "text", // Crucial for accessing responseText incrementally
        onDownloadProgress: (progressEvent) => {
          const xhr = progressEvent.event?.currentTarget as XMLHttpRequest;
          // Ensure we have the XMLHttpRequest object
          if (!xhr) return;

          const fullResponseText = xhr.responseText;
          // Get only the *new* part of the response text that hasn't been processed yet
          const newReceivedText =
            fullResponseText.substring(lastProcessedIndex);
          lastProcessedIndex = fullResponseText.length; // Update the index for the next call

          // Append newly received text to the line buffer
          lineBuffer += newReceivedText;

          // Process complete lines from the buffer
          // Split by newline and keep the last element (which might be an incomplete line)
          // in the buffer for the next `onDownloadProgress` call.
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() || ""; // Remove and store the last (potentially incomplete) line

          for (const line of lines) {
            // Ignore empty lines that are not part of an event (e.g., final `\n\n` separators)
            if (line.trim() === "") continue;

            // Process 'data:' lines as potential content chunks
            if (line.startsWith("data: ")) {
              try {
                const jsonPart = line.substring("data: ".length).trim();
                if (jsonPart) {
                  const parsedData = JSON.parse(jsonPart);
                  if (parsedData.content) {
                    onData(parsedData.content);
                  }
                  // You might also process other fields like `event: completion` here
                  // if your backend sends structured completion messages.
                }
              } catch (parseError) {
                console.error(
                  "Error parsing stream 'data' JSON:",
                  parseError,
                  "Raw line:",
                  line
                );
                // Continue processing other lines, but log the error for this specific line.
              }
            } else if (line.startsWith("event: error")) {
              // This branch specifically handles an SSE 'event: error' type.
              // If the error message is on a *subsequent* 'data:' line, it will be caught by the 'data:' parser.
              // This block is for cases where 'event: error' itself signals a critical issue,
              // or if it's followed by a data line containing the error details immediately.
              console.warn(
                "Received 'event: error' SSE event. Backend may follow with error data or close stream."
              );
              // Depending on your backend's exact error streaming format, you might call onError here
              // if `event: error` signifies a complete, non-recoverable stream error without further data.
              // For now, we'll generally rely on the main catch block for request-level errors
              // or the data: parser if error messages are embedded in data.
            }
            // Add more `else if` conditions here if your backend sends other SSE event types
            // (e.g., 'event: ping', 'event: completion').
          }
        },
      }
    );

    // After the Axios request successfully completes, process any remaining data in the lineBuffer.
    // This handles cases where the stream ends without a final newline, leaving data in `lineBuffer`.
    if (lineBuffer.length > 0) {
      const finalLines = lineBuffer.split("\n");
      for (const line of finalLines) {
        if (line.trim() === "") continue; // Ignore final empty lines

        if (line.startsWith("data: ")) {
          try {
            const jsonPart = line.substring("data: ".length).trim();
            if (jsonPart) {
              const parsedData = JSON.parse(jsonPart);
              if (parsedData.content) {
                onData(parsedData.content);
              }
            }
          } catch (parseError) {
            console.error(
              "Error parsing final stream 'data' JSON:",
              parseError,
              "Raw line:",
              line
            );
          }
        }
      }
    }

    // Call onComplete when the stream finishes successfully
    onComplete();
  } catch (err: any) {
    console.error("Axios stream error:", err);
    // Handle Axios specific error properties for better error reporting
    if (axios.isAxiosError(err)) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Response error data:", err.response.data);
        onError(
          new Error(
            err.response.data?.error ||
              err.response.data?.message ||
              `Server error: ${err.response.status}`
          )
        );
      } else if (err.request) {
        // Request was made but no response was received (e.g., network error, CORS)
        onError(new Error("No response received from server."));
      } else {
        // Something happened in setting up the request that triggered an Error (e.g., invalid config)
        onError(new Error(err.message || "An unknown network error occurred."));
      }
    } else {
      // Non-Axios error (e.g., a JavaScript error before Axios even sent the request)
      onError(err);
    }
    // Ensure onComplete is called even on error, so the frontend can reset loading states
    onComplete();
  }
};

// Export the configured Axios instance as default for other API calls if needed
export default api;
