import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSchedules } from "../api";
import { AuthContext } from "../context/AuthContext";

interface Activity {
  time: string;
  title: string;
  description: string;
  category: string;
  status: "Completed" | "Upcoming";
  icon: string;
}

const TodaysSchedule: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [mondaysActivities, setMondaysActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeekId = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday is start of week
    const startOfWeek = new Date(now.setDate(diff));
    return startOfWeek.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchMondaysSchedule = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await getSchedules(currentUser.uid);
        const currentWeekId = getWeekId();
        const currentSchedule = response.data.find(
          (schedule: any) => schedule.weekId === currentWeekId
        );

        if (currentSchedule) {
          const monday = currentSchedule.schedule.find(
            (day: any) => day.name.toLowerCase() === "monday"
          );
          if (monday) {
            setMondaysActivities(monday.activities);
          }
        }
      } catch (error) {
        console.error("Error fetching Monday's schedule:", error);
        setError("Failed to load Monday's schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchMondaysSchedule();
  }, [currentUser]);

  if (loading) {
    return <div className="bg-white p-4 rounded-lg shadow">Loading schedule...</div>;
  }

  if (error) {
    return <div className="bg-white p-4 rounded-lg shadow text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Today's Schedule (Monday)</h2>
      {mondaysActivities.length > 0 ? (
        <div className="space-y-3">
          {mondaysActivities.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="text-sm text-gray-500 w-16">{item.time.split(" - ")[0]}</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full mx-3"></div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-3">No schedule found for this week.</p>
          <button
            onClick={() => navigate("/schedule")} // Or trigger schedule creation
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Create a Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;
