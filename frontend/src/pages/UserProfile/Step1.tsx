import React from "react";
import {
  FiUsers,
  FiZap,
  FiBarChart2,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface Step1Props {
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ nextStep }) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to Rootly!
        </h1>
        <p className="text-gray-500">
          Let's set up your smart classroom in just a few simple steps
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-center text-sm text-gray-600">
          Rootly helps you manage multi-grade classrooms with AI-powered
          planning, student progress tracking, and personalized learning paths.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <FeatureCard
          icon={<FiUsers className="text-purple-600" />}
          title="Multi-Grade Support"
          subtitle="Manage 1-5 grades seamlessly"
        />
        <FeatureCard
          icon={<FiZap className="text-purple-600" />}
          title="AI Planning"
          subtitle="Automated lesson planning"
        />
        <FeatureCard
          icon={<FiBarChart2 className="text-purple-600" />}
          title="Progress Tracking"
          subtitle="Real-time student insights"
        />
        <FeatureCard
          icon={<FiHeart className="text-purple-600" />}
          title="Confidence Building"
          subtitle="Boost student engagement"
        />
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-yellow-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Next: Essential Setup</p>
            <p className="text-sm">
              Complete your classroom configuration to unlock all AI-powered
              features
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="flex items-center text-gray-600" disabled>
          <FiChevronLeft className="mr-2" />
          Previous
        </button>
        <button
          onClick={nextStep}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center"
        >
          Next
          <FiChevronRight className="ml-2" />
        </button>
      </div>
    </>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="p-3 bg-purple-100 rounded-full mb-3">{icon}</div>
    <p className="font-semibold text-gray-800 text-sm">{title}</p>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

export default Step1;
