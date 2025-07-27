import React, { useState } from "react";

interface Activity {
  id: string;
  time: string;
  endTime: string;
  title: string;
  description: string;
  subject: string;
  status: "completed" | "live" | "upcoming";
  icon: string;
}

interface DaySchedule {
  day: string;
  status: "completed" | "active" | "upcoming";
  activities: Activity[];
}

const PlanningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"programs" | "content">(
    "programs"
  );

  const weeklySchedule: DaySchedule[] = [
    {
      day: "Monday",
      status: "active",
      activities: [
        {
          id: "1",
          time: "9:00",
          endTime: "9:15",
          title: "Morning Circle & Goal Setting",
          description:
            "Daily greeting, weather check, and learning objectives review",
          subject: "General",
          status: "completed",
          icon: "🎯",
        },
        {
          id: "2",
          time: "9:15",
          endTime: "9:45",
          title: "Mathematics Workshop",
          description:
            "Station-based learning: counting and number recognition",
          subject: "Mathematics",
          status: "completed",
          icon: "🔢",
        },
        {
          id: "3",
          time: "9:45",
          endTime: "10:15",
          title: "Reading & Literacy",
          description: "Guided reading groups with leveled books",
          subject: "English",
          status: "live",
          icon: "📚",
        },
        {
          id: "4",
          time: "10:15",
          endTime: "10:30",
          title: "Snack & Movement Break",
          description: "Healthy snack time and physical activity",
          subject: "Physical",
          status: "upcoming",
          icon: "🍎",
        },
        {
          id: "5",
          time: "10:30",
          endTime: "11:00",
          title: "Science Exploration",
          description: "Hands-on experiments and observations",
          subject: "Science",
          status: "upcoming",
          icon: "🔬",
        },
      ],
    },
    {
      day: "Tuesday",
      status: "upcoming",
      activities: [
        {
          id: "6",
          time: "9:00",
          endTime: "9:15",
          title: "Tuesday Check-in",
          description: "Review previous learning and set daily intentions",
          subject: "General",
          status: "upcoming",
          icon: "🎯",
        },
        {
          id: "7",
          time: "9:15",
          endTime: "9:45",
          title: "Creative Writing",
          description: "Story writing workshop with creative prompts",
          subject: "English",
          status: "upcoming",
          icon: "✍️",
        },
        {
          id: "8",
          time: "9:45",
          endTime: "10:15",
          title: "Math Games",
          description: "Interactive mathematical problem solving",
          subject: "Mathematics",
          status: "upcoming",
          icon: "🎲",
        },
        {
          id: "9",
          time: "10:15",
          endTime: "10:30",
          title: "Outdoor Movement",
          description: "Physical activities and fresh air",
          subject: "Physical",
          status: "upcoming",
          icon: "🏃‍♂️",
        },
        {
          id: "10",
          time: "10:30",
          endTime: "11:00",
          title: "Art & Creativity",
          description: "Creative expression through various art mediums",
          subject: "Art",
          status: "upcoming",
          icon: "🎨",
        },
      ],
    },
    {
      day: "Wednesday",
      status: "upcoming",
      activities: [
        {
          id: "11",
          time: "9:00",
          endTime: "9:15",
          title: "Mid-week Reflection",
          description: "Reflect on learning progress and goals",
          subject: "General",
          status: "upcoming",
          icon: "🤔",
        },
        {
          id: "12",
          time: "9:15",
          endTime: "9:45",
          title: "Science Experiment",
          description: "Weekly science investigation and discovery",
          subject: "Science",
          status: "upcoming",
          icon: "🧪",
        },
        {
          id: "13",
          time: "9:45",
          endTime: "10:15",
          title: "Reading Comprehension",
          description: "Developing reading strategies and understanding",
          subject: "English",
          status: "upcoming",
          icon: "📖",
        },
        {
          id: "14",
          time: "10:15",
          endTime: "10:30",
          title: "Nature Walk",
          description: "Outdoor exploration and observation",
          subject: "Science",
          status: "upcoming",
          icon: "🌿",
        },
        {
          id: "15",
          time: "10:30",
          endTime: "11:00",
          title: "Music & Movement",
          description: "Musical activities and rhythmic expression",
          subject: "Music",
          status: "upcoming",
          icon: "🎵",
        },
      ],
    },
    {
      day: "Thursday",
      status: "upcoming",
      activities: [
        {
          id: "16",
          time: "9:00",
          endTime: "9:15",
          title: "Thursday Motivation",
          description: "Energizing activities and positive mindset",
          subject: "General",
          status: "upcoming",
          icon: "⚡",
        },
        {
          id: "17",
          time: "9:15",
          endTime: "9:45",
          title: "Math Review",
          description: "Review and reinforce mathematical concepts",
          subject: "Mathematics",
          status: "upcoming",
          icon: "🧮",
        },
        {
          id: "18",
          time: "9:45",
          endTime: "10:15",
          title: "Language Skills",
          description: "Grammar, vocabulary, and language development",
          subject: "English",
          status: "upcoming",
          icon: "📝",
        },
        {
          id: "19",
          time: "10:15",
          endTime: "10:30",
          title: "Active Break",
          description: "Physical games and movement activities",
          subject: "Physical",
          status: "upcoming",
          icon: "🤸‍♀️",
        },
        {
          id: "20",
          time: "10:30",
          endTime: "11:00",
          title: "Social Studies",
          description: "Community awareness and cultural learning",
          subject: "Social Studies",
          status: "upcoming",
          icon: "🌍",
        },
      ],
    },
    {
      day: "Friday",
      status: "upcoming",
      activities: [
        {
          id: "21",
          time: "9:00",
          endTime: "9:15",
          title: "Week Review",
          description: "Review weekly achievements and celebrate learning",
          subject: "General",
          status: "upcoming",
          icon: "🏆",
        },
        {
          id: "22",
          time: "9:15",
          endTime: "9:45",
          title: "Show & Tell",
          description: "Students share their learning and discoveries",
          subject: "Communication",
          status: "upcoming",
          icon: "🎤",
        },
        {
          id: "23",
          time: "9:45",
          endTime: "10:15",
          title: "Free Choice Centers",
          description: "Student-led choice of learning activities",
          subject: "Mixed",
          status: "upcoming",
          icon: "🎯",
        },
        {
          id: "24",
          time: "10:15",
          endTime: "10:30",
          title: "Classroom Cleanup",
          description: "Organize classroom and prepare for next week",
          subject: "Life Skills",
          status: "upcoming",
          icon: "🧹",
        },
        {
          id: "25",
          time: "10:30",
          endTime: "11:00",
          title: "Week Reflection",
          description: "Reflect on learning and preview next week",
          subject: "General",
          status: "upcoming",
          icon: "💭",
        },
      ],
    },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      General: "bg-purple-100 text-purple-800",
      Mathematics: "bg-blue-100 text-blue-800",
      English: "bg-green-100 text-green-800",
      Science: "bg-orange-100 text-orange-800",
      Physical: "bg-red-100 text-red-800",
      Art: "bg-pink-100 text-pink-800",
      Music: "bg-indigo-100 text-indigo-800",
      "Social Studies": "bg-yellow-100 text-yellow-800",
      Communication: "bg-teal-100 text-teal-800",
      Mixed: "bg-gray-100 text-gray-800",
      "Life Skills": "bg-cyan-100 text-cyan-800",
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-gray-500";
      case "live":
        return "text-green-600 bg-green-50 border-l-4 border-green-500";
      default:
        return "text-gray-900";
    }
  };

  const getDayStatusBadge = (status: string, activityCount: number) => {
    switch (status) {
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            completed • {activityCount} activities
          </span>
        );
      case "active":
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            active • {activityCount} activities
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            upcoming • {activityCount} activities
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Curation</h1>
          <p className="text-gray-600">
            Curate learning programs and educational content
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("programs")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "programs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Learning Programs
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "content"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Content
          </button>
        </div>

        {/* Content */}
        {activeTab === "programs" && (
          <div>
            {/* Schedule Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Weekly Learning Schedule
                </h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                  <span>📥</span>
                  Export Schedule
                </button>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-6">
              {weeklySchedule.map((daySchedule) => (
                <div
                  key={daySchedule.day}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Day Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {daySchedule.day}
                      </h3>
                      {getDayStatusBadge(
                        daySchedule.status,
                        daySchedule.activities.length
                      )}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {daySchedule.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                            activity.status === "live"
                              ? getStatusColor("live")
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {/* Time */}
                          <div className="w-16 text-sm text-gray-600 flex flex-col">
                            <span className="font-medium">{activity.time}</span>
                            <span className="text-xs">{activity.endTime}</span>
                          </div>

                          {/* Icon */}
                          <div className="text-2xl mt-1">{activity.icon}</div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4
                                  className={`font-semibold ${getStatusColor(
                                    activity.status
                                  )}`}
                                >
                                  {activity.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {activity.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 ml-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(
                                    activity.subject
                                  )}`}
                                >
                                  {activity.subject}
                                </span>
                                {activity.status === "live" && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                    Live Now
                                  </span>
                                )}
                                {activity.status === "completed" && (
                                  <span className="text-gray-500 text-xs">
                                    Completed
                                  </span>
                                )}
                                {activity.status === "upcoming" && (
                                  <span className="text-blue-600 text-xs">
                                    Upcoming
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Content Management
            </h3>
            <p className="text-gray-600">
              Content curation tools will be available here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningPage;
