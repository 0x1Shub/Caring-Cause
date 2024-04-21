import { Link } from "react-router-dom";
import CircleRating from "./CircleRating";

type CampaignProps = {
    campaignId: string;
    photo: string;
    title: string;
    name:string;
    amount: number;
    goalAmount: number; 
    days: number;
    handler: () => void;
};
const server = 'asasa';

const CampaignCard = ({campaignId, amount, name, title, photo, days, goalAmount, handler} : CampaignProps) => {
  return (
    <div className="campaign-card">
        <img src={photo} alt={title} />
        <p className="title">{title}</p>
        <p className="author">Created by: {name}</p>

        <div className="rating">
            <CircleRating amountRaised={(amount / goalAmount)*100} />
            <span>₹ {amount} raised out of ₹{goalAmount}</span>
        </div>
        

        <span>Remaining time: {days} days</span>

        <div className="btn">
            <Link className="donation" to={`fundraisers/id:${campaignId}`} onClick={() => handler()}>
                <span>Donate</span>
            </Link>
            <Link className="share" to={'/'} onClick={() => handler()}>
                <span>Share</span>
            </Link>
        </div>
    </div>
  )
}

export default CampaignCard