import React, { useState, useContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { updateUserProfile } from "../../services/userService";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfileLayout: React.FC = () => {
  const [step, setStep] = useState(1);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 2
    schoolName: "",
    schoolType: "",
    schoolMedium: "",
    syllabus: "",
    location: "",
    schoolCapacity: "",
    grades: [],
    classroomCount: "",
    classroomArea: "",
    isSingleTeacherSchool: "",
    staffCount: "",
    amenities: [],
    hasPlayground: "",
    // Step 3
    name: "",
    languages: [],
    languageProficiency: 0,
    qualification: "",
    teachingStrength: 0,
  });

  const nextStep = async () => {
    if (step === 3) {
      if (!currentUser) {
        toast.error("You must be logged in to update your profile.");
        return;
      }
      try {
        await updateUserProfile(formData);
        toast.success("Profile updated successfully!");
        setStep((prev) => prev + 1);
      } catch (error) {
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption: any, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMultiSelectChange = (selectedOptions: any, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((o: any) => o.value) : [],
    }));
  };

  const setRating = (name: string, rating: number) => {
    setFormData((prev) => ({ ...prev, [name]: rating }));
  };

  const handleAddLanguage = (language: string) => {
    setFormData((prev: any) => ({
      ...prev,
      languages: [...prev.languages, language],
    }));
  };

  const onDone = () => {
    navigate("/home");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
        );
      case 3:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setRating={setRating}
            handleAddLanguage={handleAddLanguage}
            handleChange={handleChange}
          />
        );
      case 4:
        return <Step4 onDone={onDone} />;
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
            <span>{step} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${step * 25}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default UserProfileLayout;
