import React, { useState } from "react";
import StarRating from "../../components/StarRating";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  setRating: (name: string, rating: number) => void;
  handleAddLanguage: (language: string) => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const Step3: React.FC<Step3Props> = ({
  nextStep,
  prevStep,
  formData,
  setRating,
  handleAddLanguage,
  handleChange,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("");

  const handleAddLanguageClick = () => {
    if (currentLanguage.trim() !== "") {
      handleAddLanguage(currentLanguage.trim());
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
            name="name"
            value={formData.name}
            onChange={handleChange}
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
              onClick={handleAddLanguageClick}
              className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {formData.languages.map((lang: string, index: number) => (
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
            rating={formData.languageProficiency}
            setRating={(rating) => setRating("languageProficiency", rating)}
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
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Strength
          </label>
          <StarRating
            rating={formData.teachingStrength}
            setRating={(rating) => setRating("teachingStrength", rating)}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
