import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface UserInformationProps {
    formData: {
        userName: string;
        education: string;
        employment: string;
        mobile: string;
        dob: string;
    };
    onChange: (data: any) => void;
    onNext: () => void;
}

const UserInformation = ({ formData, onChange, onNext }: UserInformationProps) => {
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="campaign-create">
            <button className="back-btn" onClick={() => navigate("/")}>
                <BiArrowBack />
            </button>

            <form onSubmit={onNext}>
                <h1>New Campaign</h1>
                <h5>User Information</h5>
                <input required type="text" placeholder="Your Name" name="userName" value={formData.userName} onChange={handleChange} />
                <select name="employment" required value={formData.employment} onChange={handleChange}>
                    <option value="">Select Employment</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Student">Student</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Unemployed">Unemployed</option>
                </select>
                <select name="education" required value={formData.education} onChange={handleChange}>
                    <option value="">Select Education</option>
                    <option value="Below 10th">Below 10th</option>
                    <option value="10th-12th">10th-12th</option>
                    <option value="Graduate">Graduate</option>
                    <option value="PostGraduate">PostGraduate</option>
                </select>
                <input required type="text" placeholder="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />
                <input type="date" placeholder="DOB" name="dob" value={formData.dob} onChange={handleChange} />
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default UserInformation;
