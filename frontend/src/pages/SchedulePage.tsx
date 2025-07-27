import React, { useState } from "react";
import { Calendar, Download, Volume2, RefreshCw, BookOpen } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  description: string;
  category: string;
  status: "Completed" | "Upcoming";
  icon: React.ElementType;
}

interface Day {
  name: string;
  status: string;
  activities: Activity[];
}

const scheduleData: Day[] = [
  {
    name: "Monday",
    status: "completed",
    activities: [
      {
        time: "9:00 - 9:15",
        title: "Morning Circle & Goal Setting",
        description:
          "Daily greeting, weather check, and learning objectives review",
        category: "General",
        status: "Completed",
        icon: Volume2,
      },
      {
        time: "9:15 - 9:45",
        title: "Mathematics Workshop",
        description: "Introduction to fractions and group activities",
        category: "Mathematics",
        status: "Completed",
        icon: RefreshCw,
      },
    ],
  },
  // ... more days can be added here
];

const SchedulePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Learning Programs");

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Curation</h1>
          <p className="text-lg text-gray-500 mt-1">
            Curate learning programs and educational content
          </p>
        </header>

        <div className="mb-6">
          <div className="bg-white p-1 rounded-full inline-flex border border-gray-200">
            <button
              onClick={() => setActiveTab("Learning Programs")}
              className={`px-6 py-2 rounded-full text-sm font-semibold ${
                activeTab === "Learning Programs"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Learning Programs
            </button>
            <button
              onClick={() => setActiveTab("Content")}
              className={`px-6 py-2 rounded-full text-sm font-semibold ${
                activeTab === "Content"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Content
            </button>
          </div>
        </div>

        <main className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Weekly Learning Schedule
            </h2>
            <button className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 hover:bg-green-200">
              <Download className="w-4 h-4 mr-2" />
              Export Schedule
            </button>
          </div>

          <div className="space-y-6">
            {scheduleData.map((day) => (
              <div key={day.name}>
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <h3 className="text-lg font-bold text-gray-700">
                    {day.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full">
                      {day.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {day.activities.length} activities
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-24 text-right mr-4">
                        <p className="text-sm font-semibold text-gray-600">
                          {activity.time.split(" - ")[0]}
                        </p>
                        <p className="text-xs text-gray-400">
                          {activity.time.split(" - ")[1]}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-blue-600 mr-4">
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                            {activity.category}
                          </span>
                          <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulePage;
