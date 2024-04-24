import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        phone: "",
        panCardNumber: "",
        accountNumber: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleRequestFund = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Requesting fund:", shippingInfo);
    };

    return (
        <div className="checkout">
            <button className="back-btn" onClick={() => navigate('/profile/fundraisers')}><BiArrowBack /></button>
            <form onSubmit={handleRequestFund}>
                <h1>Checkout Info</h1>
                <input required type="text" placeholder="Name" name="name" value={shippingInfo.name} onChange={changeHandler} />
                <input required type="tel" placeholder="Phone" name="phone" value={shippingInfo.phone} onChange={changeHandler} />
                <input required type="text" placeholder="Pan Card Number" name="panCardNumber" value={shippingInfo.panCardNumber} onChange={changeHandler} />
                <input required type="text" placeholder="Account Number" name="accountNumber" value={shippingInfo.accountNumber} onChange={changeHandler} />
                <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
                <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} />
                <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler} />
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                </select>
                <input required type="text" placeholder="Pin Code" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} />
                <button type="submit">Request Fund</button>
            </form>
        </div>
    );
};

export default Checkout;
