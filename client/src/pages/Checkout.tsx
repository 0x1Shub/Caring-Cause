import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

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

    return <div className="checkout">
            <button className="back-btn" onClick={() => naviget('/profile/fundraisers')}><BiArrowBack /></button>
            <form>
                <h1>Checkout Info</h1>
                <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
                <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} /> 
                <input required type="text" placeholder="State" name="state"  value={shippingInfo.state} onChange={changeHandler} />  
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Select Country</option>
                    <option value="">India</option>
                    <option value="">USA</option>
                </select>
                <input required type="text" placeholder="Pin Code" name="number" value={shippingInfo.pinCode} onChange={changeHandler} /> 

                <button type="submit">Request Fund</button>
            
            </form>
        </div>

}

export default Checkout