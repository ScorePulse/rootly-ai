import React from "react";
import Select from "react-select";
import {
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (selectedOption: any, name: string) => void;
  handleMultiSelectChange: (selectedOptions: any, name: string) => void;
}

const gradeOptions = [...Array(8)].map((_, i) => ({
  value: i + 1,
  label: `Grade ${i + 1}`,
}));

const amenityOptions = [
  { value: "internet", label: "Internet Connection" },
  { value: "devices", label: "Digital Devices" },
  { value: "projectors", label: "Projectors" },
  { value: "science-equipment", label: "Science Equipment" },
  { value: "whiteboard", label: "Whiteboard" },
  { value: "audio-system", label: "Audio System" },
];

const schoolTypeOptions = [
  { value: "higher-primary", label: "Higher Primary" },
  { value: "junior-high", label: "Junior High School" },
];

const schoolMediumOptions = [
  { value: "marathi", label: "Marathi Medium" },
  { value: "english", label: "English Medium" },
];

const singleTeacherSchoolOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const playgroundAvailableOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const syllabusOptions = [
  { value: "cbsc", label: "CBSC" },
  { value: "state-board", label: "State Board" },
];

const Step2: React.FC<Step2Props> = ({
  nextStep,
  prevStep,
  formData,
  handleChange,
  handleSelectChange,
  handleMultiSelectChange,
}) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <FiSettings className="w-12 h-12 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Essential Classroom Setup
        </h1>
        <p className="text-gray-500 mb-4">
          This is the most important step - configure your classroom for optimal
          AI assistance
        </p>
        <span className="bg-orange-200 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
          Required for AI Features
        </span>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <p className="font-bold text-blue-800 mb-2">What We'll Configure:</p>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>Classroom layout and student capacity</li>
          <li>Grade levels and teaching subjects</li>
          <li>Available facilities and resources</li>
          <li>Your teaching preferences and strengths</li>
        </ul>
      </div>

      <form className="space-y-4">
        {/* School Name */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            School Name
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter school name"
          />
        </div>

        {/* School Type */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            School Type
          </label>
          <Select
            name="schoolType"
            options={schoolTypeOptions}
            value={schoolTypeOptions.find(
              (option) => option.value === formData.schoolType
            )}
            onChange={(option) => handleSelectChange(option, "schoolType")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* School Medium */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            School Medium
          </label>
          <Select
            name="schoolMedium"
            options={schoolMediumOptions}
            value={schoolMediumOptions.find(
              (option) => option.value === formData.schoolMedium
            )}
            onChange={(option) => handleSelectChange(option, "schoolMedium")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Syllabus Applicable */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Syllabus Applicable
          </label>
          <Select
            name="syllabus"
            options={syllabusOptions}
            value={syllabusOptions.find(
              (option) => option.value === formData.syllabus
            )}
            onChange={(option) => handleSelectChange(option, "syllabus")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter location"
          />
        </div>

        {/* School Capacity / Size */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            School Capacity / Size
          </label>
          <input
            type="number"
            id="schoolCapacity"
            name="schoolCapacity"
            value={formData.schoolCapacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter number"
          />
        </div>

        {/* Grades */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Grades
          </label>
          <Select
            isMulti
            name="grades"
            options={gradeOptions}
            value={gradeOptions.filter((option) =>
              formData.grades.includes(option.value)
            )}
            onChange={(options) => handleMultiSelectChange(options, "grades")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Number of Classrooms */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Number of Classrooms
          </label>
          <input
            type="number"
            id="classroomCount"
            name="classroomCount"
            value={formData.classroomCount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter number"
          />
        </div>

        {/* Classroom Area */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Classroom Area (sq. ft.)
          </label>
          <input
            type="number"
            id="classroomArea"
            name="classroomArea"
            value={formData.classroomArea}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter area"
          />
        </div>

        {/* Single Teacher School */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Single Teacher School
          </label>
          <Select
            name="isSingleTeacherSchool"
            options={singleTeacherSchoolOptions}
            value={singleTeacherSchoolOptions.find(
              (option) => option.value === formData.isSingleTeacherSchool
            )}
            onChange={(option) =>
              handleSelectChange(option, "isSingleTeacherSchool")
            }
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Number of Staff */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Number of Staff
          </label>
          <input
            type="number"
            id="staffCount"
            name="staffCount"
            value={formData.staffCount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter number"
          />
        </div>

        {/* Amenities Available */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Amenities Available
          </label>
          <Select
            isMulti
            name="amenities"
            options={amenityOptions}
            value={amenityOptions.filter((option) =>
              formData.amenities.includes(option.value)
            )}
            onChange={(options) =>
              handleMultiSelectChange(options, "amenities")
            }
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Playground Available */}
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Playground Available
          </label>
          <Select
            name="hasPlayground"
            options={playgroundAvailableOptions}
            value={playgroundAvailableOptions.find(
              (option) => option.value === formData.hasPlayground
            )}
            onChange={(option) => handleSelectChange(option, "hasPlayground")}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </form>

      <div className="flex justify-between items-center mt-6">
        <button onClick={prevStep} className="flex items-center text-gray-600">
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

export default Step2;
