import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CampaignCreate = () => {

  const naviget = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
  });

  const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setShippingInfo(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  return (
    <div className="campaign-create">
            <button className="back-btn" onClick={() => naviget('/')}><BiArrowBack /></button>
            <form>
                <h1>New Campaign</h1>
                <input required type="text" placeholder="Your Name" name="name" value={shippingInfo.address} onChange={changeHandler} />
                <input required type="text" placeholder="Address" name="Address" value={shippingInfo.city} onChange={changeHandler} /> 
                <input required type="text" placeholder="State" name="state"  value={shippingInfo.state} onChange={changeHandler} />  
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Select Country</option>
                    <option value="">India</option>
                    <option value="">USA</option>
                </select>
                <select name="category" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Select Category</option>
                    <option value="">Education</option>
                    <option value="">Health</option>
                </select>
                <input required type="text" placeholder="Pin Code" name="number" value={shippingInfo.pinCode} onChange={changeHandler} /> 

                <button type="submit">Create Campaign</button>
            
            </form>
        </div>
  )
}

export default CampaignCreate