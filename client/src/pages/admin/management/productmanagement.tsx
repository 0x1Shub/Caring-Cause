import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const CampaignManagement = () => {
  const [amountGoal, setAmountGoal] = useState<number>(2000);
  const [amountRaised, setAmountRaised] = useState<number>(10);
  const [name, setName] = useState<string>("Education");
  const [photo, setPhoto] = useState<string>(img);
  const [category, setCategory] = useState<string>("Education");

  const [amountGoalUpdate, setAmountGoalUpdate] = useState<number>(amountGoal);
  const [amountRaisedUpdate, setAmountRaisedUpdate] = useState<number>(amountRaised);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setName(nameUpdate);
    setAmountGoal(amountGoalUpdate);
    setAmountRaised(amountRaisedUpdate);
    setPhoto(photoUpdate);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - fsdfsfsggfgdf</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          {amountRaised > 0 ? (
            <span className="green">{amountRaised} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{amountGoal}</h3>
        </section>
        <article>
          <button className="product-delete-btn">
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Goal Amount</label>
              <input
                type="number"
                placeholder="Goal Amount"
                value={amountGoalUpdate}
                onChange={(e) => setAmountGoalUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Raised Amount</label>
              <input
                type="number"
                placeholder="Stock"
                value={amountRaisedUpdate}
                onChange={(e) => setAmountRaisedUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default CampaignManagement;
