import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  IoAnalytics,
  IoPersonAddOutline,
  IoCalendarClearOutline,
  IoBookOutline,
} from "react-icons/io5";

const HomePage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const getInitials = (
    name: string | null | undefined,
    email: string | null | undefined
  ) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "??";
  };

  // Dummy data based on the image
  const userData = {
    initials: getInitials(currentUser?.displayName, currentUser?.email),
    name: "Ms.", // From image
    school: "Greenwood Elementary",
    activeStudents: 45,
    gradeLevels: 5,
    avgProgress: "89%",
    conceptsThisWeek: 12,
  };

  const schedule = [
    {
      subject: "Math: Addition & Subtraction",
      grades: "Grades 1-2",
      time: "9:00 AM",
      status: "Active",
    },
    {
      subject: "English: Reading Comprehension",
      grades: "Grades 3-5",
      time: "10:30 AM",
      status: "Upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 rounded-xl shadow-lg flex items-center">
          <div className="w-12 h-12 bg-white text-purple-700 rounded-full flex items-center justify-center font-bold text-xl">
            {userData.initials}
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-lg">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-xs">
              Managing {userData.gradeLevels} grades • {userData.activeStudents}{" "}
              students
            </p>
            <p className="text-xs font-light">{userData.school}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <StatCard
            value={userData.activeStudents.toString()}
            label="Active Students"
          />
          <StatCard
            value={userData.gradeLevels.toString()}
            label="Grade Levels"
          />
          <StatCard value={userData.avgProgress} label="Avg Progress" />
          <StatCard
            value={userData.conceptsThisWeek.toString()}
            label="Concepts This Week"
          />
        </div>

        {/* Today's Schedule */}
        <div className="mt-4 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Today's Schedule</h2>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <div className="mt-4 space-y-4">
            {schedule.map((item, index) => (
              <div key={index}>
                <p className="font-bold text-gray-700">{item.subject}</p>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-500">
                    {item.grades} · {item.time}
                  </p>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      item.status === "Active"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <ActionButton
            icon={<IoBookOutline size={24} />}
            label="Daily Plan"
            primary
          />
          <ActionButton
            icon={<IoPersonAddOutline size={24} />}
            label="Add Student"
          />
          <ActionButton
            icon={<IoCalendarClearOutline size={24} />}
            label="Plan Week"
          />
          <ActionButton icon={<IoAnalytics size={24} />} label="Analytics" />
        </div>
      </div>
    </div>
  );
};

// StatCard component
const StatCard: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-white p-4 rounded-xl shadow-lg text-center">
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

// ActionButton component
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}> = ({ icon, label, primary = false }) => (
  <div
    className={`p-4 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer ${
      primary ? "bg-purple-700 text-white" : "bg-white text-gray-700"
    }`}
  >
    {icon}
    <p className="mt-1 text-sm font-semibold">{label}</p>
  </div>
);

export default HomePage;
