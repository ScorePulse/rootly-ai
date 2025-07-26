import React from "react";
import {
  FiGift,
  FiCheck,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiStar,
} from "react-icons/fi";

interface Step4Props {
  onDone: () => void;
}

const Step4: React.FC<Step4Props> = ({ onDone }) => {
  return (
    <div className="text-center">
      <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
        <FiGift className="w-12 h-12 text-purple-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        You're All Set! 🚀
      </h1>
      <p className="text-gray-500 mb-6">
        Your smart classroom is ready for AI-powered learning
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 flex flex-col items-center justify-center">
          <FiCheck className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-semibold text-gray-800">Setup Complete</p>
          <p className="text-sm text-gray-500">Classroom fully configured</p>
        </div>
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 flex flex-col items-center justify-center">
          <FiCheck className="w-8 h-8 text-blue-600 mb-2" />
          <p className="font-semibold text-gray-800">AI Activated</p>
          <p className="text-sm text-gray-500">Smart planning enabled</p>
        </div>
      </div>

      <div>
        <p className="text-gray-600 font-semibold mb-4">
          Ready to explore? Here's what you can do:
        </p>
        <div className="space-y-3 text-left">
          <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
            <FiCalendar className="w-6 h-6 text-purple-600 mr-4" />
            <div>
              <p className="font-semibold text-gray-800">Create Weekly Plans</p>
              <p className="text-sm text-gray-500">
                AI-generated lesson schedules
              </p>
            </div>
          </button>
          <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
            <FiUsers className="w-6 h-6 text-purple-600 mr-4" />
            <div>
              <p className="font-semibold text-gray-800">Add More Students</p>
              <p className="text-sm text-gray-500">
                Build your complete class roster
              </p>
            </div>
          </button>
          <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
            <FiBarChart2 className="w-6 h-6 text-purple-600 mr-4" />
            <div>
              <p className="font-semibold text-gray-800">Track Progress</p>
              <p className="text-sm text-gray-500">
                Monitor student development
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-purple-600 text-white rounded-lg p-4 flex items-center justify-center">
        <FiStar className="w-6 h-6 mr-3" />
        <div>
          <p className="font-bold">Welcome Bonus Activated!</p>
          <p className="text-sm">
            Premium AI features enabled for your first month free
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={onDone}
          className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Step4;
