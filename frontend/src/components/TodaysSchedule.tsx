import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  duration: string;
  status?: "live" | "completed" | "upcoming";
}

const TodaysSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const allScheduleItems: ScheduleItem[] = [
    {
      id: "1",
      time: "09:00",
      title: "Morning Assembly",
      subtitle: "Daily goal setting",
      duration: "10m",
      status: "completed",
    },
    {
      id: "2",
      time: "09:10",
      title: "Learning Program 1",
      subtitle: "English & Science",
      duration: "30m",
      status: "completed",
    },
    {
      id: "3",
      time: "09:40",
      title: "Learning Program 2",
      subtitle: "Math & Science",
      duration: "30m",
      status: "live",
    },
    {
      id: "4",
      time: "10:10",
      title: "Snack Break",
      subtitle: "Nutrition & Hygiene",
      duration: "15m",
      status: "upcoming",
    },
    {
      id: "5",
      time: "10:25",
      title: "Learning Program 3",
      subtitle: "PE & Science",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "6",
      time: "10:55",
      title: "Learning Program 4",
      subtitle: "Science focus",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "7",
      time: "11:25",
      title: "Creative Writing",
      subtitle: "Story development",
      duration: "25m",
      status: "upcoming",
    },
    {
      id: "8",
      time: "11:50",
      title: "Art & Creativity",
      subtitle: "Drawing and painting",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "9",
      time: "12:20",
      title: "Lunch Break",
      subtitle: "Nutrition & social time",
      duration: "40m",
      status: "upcoming",
    },
    {
      id: "10",
      time: "13:00",
      title: "Quiet Time",
      subtitle: "Rest & reflection",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "11",
      time: "13:30",
      title: "Learning Program 5",
      subtitle: "Social Studies & Geography",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "12",
      time: "14:00",
      title: "Music & Movement",
      subtitle: "Rhythm & coordination",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "13",
      time: "14:30",
      title: "Learning Program 6",
      subtitle: "Life Skills & Problem Solving",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "14",
      time: "15:00",
      title: "Outdoor Play",
      subtitle: "Physical activity & games",
      duration: "30m",
      status: "upcoming",
    },
    {
      id: "15",
      time: "15:30",
      title: "Reflection & Wrap-up",
      subtitle: "Daily review & tomorrow prep",
      duration: "30m",
      status: "upcoming",
    },
  ];

  const scheduleItems = showFullSchedule
    ? allScheduleItems
    : allScheduleItems.slice(0, 6);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "live":
        return "text-green-500";
      case "completed":
        return "text-gray-400";
      default:
        return "text-blue-500";
    }
  };

  const getStatusDot = (status?: string) => {
    switch (status) {
      case "live":
        return "bg-green-500";
      case "completed":
        return "bg-gray-400";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 text-xs">📅</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Schedule
          </h2>
          <span className="text-sm text-gray-500">09:55 AM</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Manage
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {scheduleItems.map((item, index) => (
          <div key={item.id} className="flex items-start gap-4">
            {/* Time */}
            <div className="w-12 text-right">
              <span className="text-sm text-gray-600">{item.time}</span>
            </div>

            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full ${getStatusDot(item.status)}`}
              ></div>
              {index < scheduleItems.length - 1 && (
                <div className="w-px h-8 bg-gray-200 mt-1"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${getStatusColor(item.status)}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === "live" && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      LIVE
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{item.duration}</span>
                  {item.status === "live" && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setShowFullSchedule(!showFullSchedule)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          {showFullSchedule
            ? "Show Less ↑"
            : `View Full Schedule (${allScheduleItems.length} sessions) →`}
        </button>
      </div>
    </div>
  );
};

export default TodaysSchedule;
