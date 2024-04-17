import { Link } from "react-router-dom";

type CampaignProps = {
    campaignId: string;
    photo: string;
    title: string;
    amount: number;
    days: number;
    handler: () => void;
};
const server = 'asasa';

const CampaignCard = ({campaignId, amount, title, photo, days, handler} : CampaignProps) => {
  return (
    <div className="campaign-card">
        <img src={photo} alt={title} />
        <p>{title}</p>
        <span>₹ {amount}</span>
        <span>Remaining time: {days} days</span>

        <div>
            <Link className="donation" to={`fundraisers/id:${campaignId}`} onClick={() => handler()}>
                <span>Donation</span>
            </Link>
            <Link className="share" to={'/'} onClick={() => handler()}>
                <span>Share</span>
            </Link>
        </div>
    </div>
  )
}

export default CampaignCard