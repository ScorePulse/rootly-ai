import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TodaysSchedule from "../components/TodaysSchedule";
import MyTasks from "../components/MyTasks";

const HomePage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
            onClick={() => navigate("/planning")}
          />
          <ActionCard
            icon="📈"
            label="Attendance"
            iconBg="bg-red-100"
            iconColor="text-red-600"
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

// ActionCard component
const ActionCard: React.FC<{
  icon: string;
  label: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}> = ({ icon, label, iconBg, iconColor, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-3`}
      >
        <span className={`text-xl ${iconColor}`}>{icon}</span>
      </div>
      <div className="text-lg font-semibold text-gray-900">{label}</div>
    </div>
  </div>
);

export default HomePage;
