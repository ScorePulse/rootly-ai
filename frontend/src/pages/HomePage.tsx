import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TodaysSchedule from "../components/TodaysSchedule";
import MyTasks from "../components/MyTasks";
import { getSchedules, sendMessageStream, createTestStudents } from "../api";

const HomePage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPlanningLoading, setIsPlanningLoading] = useState(false);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

  const handleCreateTestStudents = async () => {
    if (!currentUser) {
      alert("You must be logged in to create test students.");
      return;
    }
    setIsAttendanceLoading(true);
    try {
      await createTestStudents(currentUser.uid);
      alert("30 dummy students created successfully!");
    } catch (error) {
      console.error("Error creating test students:", error);
      alert("Failed to create test students.");
    } finally {
      setIsAttendanceLoading(false);
    }
  };

  const getWeekId = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return startOfWeek.toISOString().split("T")[0];
  };

  const handlePlanningClick = async () => {
    if (!currentUser) return;
    setIsPlanningLoading(true);
    try {
      const response = await getSchedules(currentUser.uid);
      const currentWeekId = getWeekId();
      const existingSchedule = response.data.find(
        (schedule: any) => schedule.weekId === currentWeekId
      );

      if (existingSchedule) {
        navigate("/schedule");
      } else {
        // No schedule for the current week, so generate one
        // We need a default message to generate the schedule
        await sendMessageStream(
          "Create a new weekly schedule",
          currentUser.uid,
          () => {}
        );
        navigate("/schedule");
      }
    } catch (error) {
      console.error("Error handling planning click:", error);
      // Optionally, show an error to the user
    } finally {
      setIsPlanningLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-blue-600 rounded-lg p-4 mb-6 flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-sm">
              {getInitials(currentUser?.displayName, currentUser?.email)}
            </span>
          </div>
          <div className="text-white">
            <h1 className="text-lg font-semibold">
              Welcome back, {currentUser?.email || "User"}!
            </h1>
            <p className="text-blue-100 text-sm">
              Managing 5 grades • 45 students
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon="👥"
            value="45"
            label="Students"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            icon="📈"
            value="89%"
            label="Progress"
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            icon="📊"
            value="94%"
            label="Attendance"
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            icon="📚"
            value="12"
            label="Concepts"
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <TodaysSchedule />

          {/* My Tasks */}
          <MyTasks />
        </div>

        {/* Bottom Grid - Planning and Attendance */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <ActionCard
            icon="📋"
            label="Planning"
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            onClick={handlePlanningClick}
            isLoading={isPlanningLoading}
          />
          <ActionCard
            icon="📈"
            label="Attendance"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            onClick={handleCreateTestStudents}
            isLoading={isAttendanceLoading}
          />
        </div>
      </div>
    </div>
  );
};

// StatCard component
const StatCard: React.FC<{
  icon: string;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}> = ({ icon, value, label, iconBg, iconColor }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center mb-2`}
      >
        <span className={`text-lg ${iconColor}`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);

interface ActionCardProps {
  icon: string;
  label: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  label,
  iconBg,
  iconColor,
  onClick,
  isLoading,
}) => (
  <div
    className="bg-white p-4 rounded-lg shadow flex items-center cursor-pointer hover:bg-gray-50"
    onClick={onClick}
  >
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${iconBg}`}
    >
      <span className={`text-xl ${iconColor}`}>{isLoading ? "⏳" : icon}</span>
    </div>
    <span className="font-semibold text-gray-700">
      {isLoading ? "Generating..." : label}
    </span>
  </div>
);

export default HomePage;
