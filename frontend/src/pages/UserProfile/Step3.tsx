import React, { useState } from "react";
import StarRating from "../../components/StarRating";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep }) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [languageProficiency, setLanguageProficiency] = useState(0);
  const [teachingStrength, setTeachingStrength] = useState(0);

  const handleAddLanguage = () => {
    if (currentLanguage.trim() !== "") {
      setLanguages([...languages, currentLanguage.trim()]);
      setCurrentLanguage("");
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Tell us more about yourself
        </h2>
        <p className="text-gray-500">
          This will help us build a strong profile for you
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="languages"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Languages Known
          </label>
          <div className="flex">
            <input
              type="text"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {languages.map((lang, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language Proficiency Level
          </label>
          <StarRating
            rating={languageProficiency}
            setRating={setLanguageProficiency}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="qualification"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Qualification
          </label>
          <input
            type="text"
            id="qualification"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Strength
          </label>
          <StarRating
            rating={teachingStrength}
            setRating={setTeachingStrength}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Experience (Years)
          </label>
          <input
            type="number"
            id="experience"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
