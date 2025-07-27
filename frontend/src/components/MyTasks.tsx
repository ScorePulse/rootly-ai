import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  status: "pending" | "done";
  type: "review" | "prepare" | "send";
}

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review lesson plans for Week 5",
      status: "pending",
      type: "review",
    },
    {
      id: "2",
      title: "Prepare materials for Science experiment",
      status: "pending",
      type: "prepare",
    },
    {
      id: "3",
      title: "Send progress reports to parents",
      status: "pending",
      type: "send",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "review":
        return "📋";
      case "prepare":
        return "🧪";
      case "send":
        return "📧";
      default:
        return "📝";
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        status: "pending",
        type: "review", // Default type
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setShowAddTask(false);
    }
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "done"
                  : ("pending" as "pending" | "done"),
            }
          : task
      )
    );
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
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={addTask}
              disabled={!newTaskTitle.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <button
              onClick={() => toggleTaskStatus(task.id)}
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
              <p
                className={`text-sm font-medium ${
                  task.status === "done"
                    ? "text-gray-500 line-through"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </p>
            </div>
            <button
              onClick={() => removeTask(task.id)}
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
                  onClick={() => toggleTaskStatus(task.id)}
                  className="w-6 h-6 border-2 border-green-500 bg-green-500 rounded flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </button>
                <div className="w-6 h-6 flex items-center justify-center">
                  <span>{getTaskIcon(task.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 line-through">
                    {task.title}
                  </p>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
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
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View all {tasks.length} tasks
        </button>
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

      {/* Dropout Alert */}
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-red-600 text-xs">⚠</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-900">Dropout Alert</h4>
            <p className="text-xs text-red-700 mt-1">
              2 students showing high dropout risk indicators
            </p>
          </div>
          <button className="text-red-600 text-xs font-medium hover:underline">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
