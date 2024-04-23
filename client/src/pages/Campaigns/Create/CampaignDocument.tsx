import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface CampaignDocumentProps {
  formData: {
    description: string;
    documents: FileList | null;
  };
  onChange: (data: { description?: string; documents?: FileList | null }) => void;
  onNext: () => void;
}

const CampaignDocument = ({ formData, onChange, onNext }: CampaignDocumentProps) => {
  const navigate = useNavigate();

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ description: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange({ documents: e.target.files });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="campaign-create">
      <button className="back-btn" onClick={() => navigate("/")}>
        <BiArrowBack />
      </button>

      <form onSubmit={handleSubmit}>
        <textarea
          required
          placeholder="Campaign Description (50-60 words)"
          value={formData.description}
          onChange={handleDescriptionChange}
          maxLength={60}
        ></textarea>
        <input type="file" name="documents" accept=".pdf,.doc,.docx" onChange={handleFileChange} multiple />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CampaignDocument;
