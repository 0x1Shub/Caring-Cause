import { ChangeEvent } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface CampaignInformationProps {
    formData: {
        title: string;
        categories: string;
        amountGoal: string;
        endDate: string;
        photo: string;
    };
    onChange: (data: any) => void;
    onNext: () => void;
}

const CampaignInformation = ({ formData, onChange, onNext }: CampaignInformationProps) => {
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          onChange({ documents: e.target.files });
        }
      };

    return (
        <div className="campaign-create">
            <button className="back-btn" onClick={() => navigate("/")}>
                <BiArrowBack />
            </button>

            <form onSubmit={onNext}>
                <h1>New Campaign</h1>
                <h5>Campaign Information</h5>
                <input required type="text" placeholder="Campaign Title" name="title" value={formData.title} onChange={handleChange} />
                <select name="categories" aria-placeholder="Categories" required value={formData.categories} onChange={handleChange}>
                    <option value="">Select Categories</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Children">Children</option>
                    <option value="Animal">Animal</option>
                </select>
                <input required type="number" placeholder="Goal amount" name="amountGoal" value={formData.amountGoal} onChange={handleChange} />
                <input required type="date" placeholder="End Date" name="endDate" value={formData.endDate} onChange={handleChange} />
                <input type="file" name="photo" accept=".pdf,.doc,.docx" onChange={handleFileChange} multiple />
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default CampaignInformation;
