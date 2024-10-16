import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNewCampaignMutation } from "../../redux/api/campaignAPI";
import {toast} from 'react-hot-toast';
import { NewCampaignRequest } from "../../types/api-types";

interface CampaignCreateProps {
    formData?: {
        userName?: string;
        education?: string;
        employment?: string;
        mobile?: string;
        dob?: string;
        title?: string;
        categories?: string;
        amountGoal?: string;
        endDate?: string;
        photo?: string | File;
        description?: string;
    };
    onChange: (data: any) => void;
    onNext: () => void;
}

const CampaignCreate = ({ formData = {}, onChange, onNext }: CampaignCreateProps) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userName: formData.userName || '',
        education: formData.education || '',
        employment: formData.employment || '',
        mobile: formData.mobile || '',
        dob: formData.dob || '',
        title: formData.title || '',
        categories: formData.categories || '',
        amountGoal: formData.amountGoal || '',
        endDate: formData.endDate || '',
        photo: formData.photo || '',
        description: formData.description || '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
    if (files && files.length > 0) {
        setForm(prevState => ({
            ...prevState,
            photo: files[0] // Assuming only one file is selected
        }));
    }
    };

    const [createCampaign] = useNewCampaignMutation();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('userName', form.userName);
            formData.append('education', form.education);
            formData.append('employment', form.employment);
            formData.append('mobile', form.mobile);
            formData.append('dob', form.dob);
            formData.append('title', form.title);
            formData.append('categories', form.categories);
            formData.append('amountGoal', form.amountGoal);
            formData.append('endDate', form.endDate);
            
            if (form.photo instanceof File) {
                formData.append('photo', form.photo);
            }
            
            formData.append('description', form.description);
    
            const requestData: NewCampaignRequest = {
                id: '', 
                formData: formData
            };
    
            const response = await createCampaign(requestData);
            toast.success('Campaign created successfully');
            onNext();
        } catch (error) {
            // toast.error('Error creating campaign');
            console.error('Error creating campaign:', error);
        }
    };
    

    return (
        <div className="campaign-create">
            <button className="back-btn" onClick={() => navigate("/")}>
                <BiArrowBack />
            </button>

            <form onSubmit={handleSubmit}>
                <h1>New Campaign</h1>

                {/* User Information */}
                <h5>User Information</h5>
                <input required type="text" placeholder="Your Name" name="userName" value={form.userName} onChange={handleChange} />
                <select name="employment" required value={form.employment} onChange={handleChange}>
                    <option value="">Select Employment</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Student">Student</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Unemployed">Unemployed</option>
                </select>
                <select name="education" required value={form.education} onChange={handleChange}>
                    <option value="">Select Education</option>
                    <option value="Below 10th">Below 10th</option>
                    <option value="10th-12th">10th-12th</option>
                    <option value="Graduate">Graduate</option>
                    <option value="PostGraduate">PostGraduate</option>
                </select>
                <input required type="text" placeholder="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} />
                <input type="date" placeholder="DOB" name="dob" value={form.dob} onChange={handleChange} />

                {/* Campaign Information */}
                <h5>Campaign Information</h5>
                <input required type="text" placeholder="Campaign Title" name="title" value={form.title} onChange={handleChange} />
                <select name="categories" aria-placeholder="Categories" required value={form.categories} onChange={handleChange}>
                    <option value="">Select Categories</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Children">Children</option>
                    <option value="Animal">Animal</option>
                </select>
                <input required type="number" placeholder="Goal amount" name="amountGoal" value={form.amountGoal} onChange={handleChange} />
                <input required type="date" placeholder="End Date" name="endDate" value={form.endDate} onChange={handleChange} />
                <input type="file" name="photo" accept=".png, .jpg, .jpeg" onChange={handleFileChange} multiple />

                {/* Campaign Description */}
                <h5>Campaign Description</h5>
                <textarea
                    required
                    placeholder="Campaign Description (50-60 words)"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={60}
                ></textarea>

                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default CampaignCreate;
