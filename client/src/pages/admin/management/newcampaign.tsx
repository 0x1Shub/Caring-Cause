import { useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewCampaignMutation } from '../../../redux/api/campaignAPI';
import { useNavigate } from 'react-router-dom';
import { responseToast } from "../../../utils/features";
import { UserReducerInitialState } from '../../../types/reducer-types';

const NewCampaign = () => {
  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amountGoal, setAmountGoal] = useState<number>(1000);
  const [amountRaised, setAmountRaised] = useState<number>(0);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newCampaign] = useNewCampaignMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) {
      console.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("amountGoal", amountGoal.toString());
    formData.set("raisedAmount", amountRaised.toString());
    formData.set("category", category);
    formData.append("photo", photo);

    try {
      const res = await newCampaign({ id: user?._id!, formData });
      responseToast(res, navigate, "/admin/campaign");
    } catch (error) {
      console.error("Error creating campaign:", error);
      // Handle error
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Goal Amount</label>
              <input
                type="number"
                placeholder="AmountGoal"
                value={amountGoal}
                onChange={(e) => setAmountGoal(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. education, emergencies etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewCampaign;