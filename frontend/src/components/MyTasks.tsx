import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  generateAITasks as generateAITasksAPI,
} from "../api";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  status: "pending" | "done";
  type:
    | "review"
    | "prepare"
    | "send"
    | "study"
    | "practice"
    | "planning"
    | "assessment"
    | "individual_support"
    | "safety"
    | "communication";
  isAIGenerated?: boolean;
  priority?: "low" | "medium" | "high";
  estimatedTime?: string;
  subject?: string;
  description?: string;
}

const MyTasks: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      if (currentUser?.uid) {
        try {
          const response = await getTasks(currentUser.uid);
          setTasks(response.data.tasks || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, [currentUser?.uid]);

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const doneTasks = tasks.filter((task) => task.status === "done");

  // Show 3 tasks by default, 4 when "View all" is clicked
  const tasksToShow = showAllTasks ? pendingTasks : pendingTasks.slice(0, 3);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "review":
        return "📋";
      case "prepare":
        return "🧪";
      case "send":
        return "📧";
      case "study":
        return "📚";
      case "practice":
        return "✏️";
      case "planning":
        return "📅";
      case "assessment":
        return "📊";
      case "individual_support":
        return "👥";
      default:
        return "📝";
    }
  };

  const addTaskToDb = async () => {
    if (newTaskTitle.trim() && currentUser?.uid) {
      try {
        const response = await addTask(currentUser.uid, {
          title: newTaskTitle.trim(),
          type: "review", // Default type
        });

        const newTask = response.data.task;
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
        setShowAddTask(false);
        toast.success("Task added successfully");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task");
      }
    }
  };

  const removeTaskFromDb = async (taskId: string) => {
    if (currentUser?.uid) {
      try {
        await deleteTask(currentUser.uid, taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    }
  };

  const toggleTaskStatusInDb = async (taskId: string) => {
    if (currentUser?.uid) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const newStatus = task.status === "pending" ? "done" : "pending";
        try {
          await updateTask(currentUser.uid, taskId, { status: newStatus });
          setTasks(
            tasks.map((t) =>
              t.id === taskId ? { ...t, status: newStatus } : t
            )
          );
          toast.success(`Task marked as ${newStatus}`);
        } catch (error) {
          console.error("Error updating task:", error);
          toast.error("Failed to update task");
        }
      }
    }
  };

  const generateAITasks = async () => {
    if (currentUser?.uid) {
      try {
        toast.loading("AI is planning your tasks...", { id: "ai-planning" });
        const response = await generateAITasksAPI(currentUser.uid);
        const newTasks = response.data.tasks || [];

        // Add the new AI-generated tasks to the existing tasks
        setTasks((prevTasks) => [...prevTasks, ...newTasks]);
        toast.success(`AI generated ${newTasks.length} tasks for you!`, {
          id: "ai-planning",
        });
      } catch (error) {
        console.error("Error generating AI tasks:", error);
        toast.error("Failed to generate AI tasks", { id: "ai-planning" });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
            <span className="text-purple-600 text-xs">📋</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
            {pendingTasks.length} pending
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            {doneTasks.length} done
          </span>
        </div>
        <button
          className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <span className="text-lg">{showAddTask ? "×" : "+"}</span>
        </button>

        {/* AI Planning Button */}
        <button
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors relative group"
          onClick={() => generateAITasks()}
          title="Uses AI to help plan your tasks"
        >
          <span className="text-sm">🤖</span>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            Uses AI to help plan your tasks
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTaskToDb()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={addTaskToDb}
              disabled={!newTaskTitle.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tasksToShow.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <button
              onClick={() => toggleTaskStatusInDb(task.id)}
              className="w-6 h-6 border-2 border-gray-300 rounded hover:border-purple-500 flex items-center justify-center transition-colors"
            >
              {task.status === "done" && (
                <span className="text-purple-600 text-sm">✓</span>
              )}
            </button>
            <div className="w-6 h-6 flex items-center justify-center">
              <span>{getTaskIcon(task.type)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p
                  className={`text-sm font-medium ${
                    task.status === "done"
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
                {task.isAIGenerated && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                    AI Generated
                  </span>
                )}
                {task.priority && task.priority !== "medium" && (
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                )}
              </div>
              {(task.estimatedTime || task.subject || task.description) && (
                <div className="text-xs text-gray-500 space-y-1">
                  {task.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{task.estimatedTime}</span>
                    </div>
                  )}
                  {task.subject && task.subject !== "General" && (
                    <div className="flex items-center gap-1">
                      <span>📚</span>
                      <span>{task.subject}</span>
                    </div>
                  )}
                  {task.description && (
                    <div className="text-gray-600 mt-1 text-xs">
                      {task.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => removeTaskFromDb(task.id)}
              className="w-6 h-6 text-red-500 hover:bg-red-50 rounded flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Show completed tasks if any */}
        {doneTasks.length > 0 && (
          <>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="text-xs text-gray-500 mb-2">
              Completed ({doneTasks.length})
            </div>
            {doneTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors opacity-60"
              >
                <button
                  onClick={() => toggleTaskStatusInDb(task.id)}
                  className="w-6 h-6 border-2 border-green-500 bg-green-500 rounded flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </button>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span>{getTaskIcon(task.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-500 line-through">
                      {task.title}
                    </p>
                    {task.isAIGenerated && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium opacity-60">
                        AI Generated
                      </span>
                    )}
                  </div>
                  {(task.estimatedTime || task.subject) && (
                    <div className="text-xs text-gray-400 flex items-center gap-3">
                      {task.estimatedTime && (
                        <span>⏱️ {task.estimatedTime}</span>
                      )}
                      {task.subject && task.subject !== "General" && (
                        <span>📚 {task.subject}</span>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeTaskFromDb(task.id)}
                  className="w-6 h-6 text-red-500 hover:bg-red-50 rounded flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="mt-6 text-center">
        {pendingTasks.length > 3 && (
          <button
            onClick={() => setShowAllTasks(!showAllTasks)}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            {showAllTasks ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {/* Bottom action buttons */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 text-sm">📊</span>
            </div>
            <span className="text-xs font-medium text-gray-700">
              Students Progress
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-orange-600 text-sm">💡</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
