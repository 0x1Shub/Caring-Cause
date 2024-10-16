import { useEffect, useState } from "react";
import { VscError } from 'react-icons/vsc'
import CampaignItems from "../../components/CampaignItems";
import { Link } from "react-router-dom";

import image from '../../assets/WhatsApp Image 2024-04-25 at 09.34.07_13f6ab1e.jpg';

const campaignsItem = [
    {
        campaignId: "6629d76cac94d2164bfc5b09",
        photo : image,
        title : "Old Age Home",
        amountRaised : 2000,
        amountGoal : 50000,
    }
];

const subtotal = 40000;
const tax = Math.round(subtotal*0.18);
const shippingCharges = 200;
const rewards = 400;
const total = subtotal - tax - shippingCharges + rewards;



const MyFundraisers = () => {

    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


    useEffect(() => {
        const timeOutId = setTimeout(()=>{
            if(Math.random() > 0.5){
                setIsValidCouponCode(true);
            }
            else{
                setIsValidCouponCode(false);
            }
        }, 1000);
        return () => {
            clearTimeout(timeOutId)
            setIsValidCouponCode(false);
        }
    }, [couponCode])


  return (
    <div className='my-fundraisers'>
        <main>
            {campaignsItem.length > 0 ? 
                campaignsItem.map((i, index) => (
                    <CampaignItems key={index} campaignItem={i} />
                )) : <h1>No fundraiser campaign</h1>
            }
        </main>
        <aside>
            
            <p>Subtotal Fund Raise: ₹{subtotal}</p> 
            <p>Shipping charges: ₹{shippingCharges}</p>
            <p>Tax: ₹{tax}</p>

            <p>Reward: <em> ₹{rewards}</em></p>

            <p>
                <b>Total :₹{total}</b>
            </p>

            <input placeholder="coupon code" type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

            {
                couponCode && (isValidCouponCode ? <span className="green"> ₹{rewards} extra reward using the <code>{couponCode}</code></span>
                : <span className="red">Invalid Coupon! <VscError /></span>)
            }

            {
                campaignsItem.length > 0 && <Link to={'/checkout'}>Checkout</Link>
            }

        </aside>

    </div>
  )
}

export default MyFundraisers;