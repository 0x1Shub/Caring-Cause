import { useEffect, useState } from "react";
import { VscError } from 'react-icons/vsc'
import CampaignItems from "../../components/CampaignItems";
import { Link } from "react-router-dom";

const campaignsItem = [
    {
        campaignId: "asas",
        photo : "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
        title : "Fund Me Studies",
        amountRaised : 3000,
        amountGoal : 10000,
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