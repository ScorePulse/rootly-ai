import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const UserProfileLayout: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              SJ
            </div>
            <div className="ml-3">
              <p className="font-semibold text-gray-800">Hi Ms.!</p>
              <p className="text-sm text-gray-500">
                Let's set up your smart classroom
              </p>
            </div>
          </div>
          <button className="text-sm text-gray-500">Skip</button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Welcome</span>
            <span>{step} of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${step * 20}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default UserProfileLayout;
