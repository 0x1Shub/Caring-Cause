import { useState } from "react";
import UserInformation from "./Create/UserInformation.js";
import CampaignInformation from "./Create/CampaignInformation.js";
import CampaignDocument from "./Create/CampaignDocument.js";

const CreateCampaignPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userInfo: {
      userName: "",
      education: "",
      employment: "",
      mobile: "",
      dob: "",
    },
    campaignInfo: {
      title: "",
      categories: "",
      amountGoal: "",
      endDate: "",
      photo: "",
    },
    description: {
      description: "",
      documents: null,
    },
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFormDataChange = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <div className="create-campaign-page">
      {step === 1 && (
        <UserInformation
          formData={formData.userInfo}
          onChange={handleFormDataChange}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <CampaignInformation
          formData={formData.campaignInfo}
          onChange={handleFormDataChange}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <CampaignDocument
          formData={formData.description}
          onChange={handleFormDataChange}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default CreateCampaignPage;
