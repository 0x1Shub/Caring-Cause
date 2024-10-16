import { Link } from "react-router-dom";
import CircleRating from "./CircleRating";
import { server } from "../redux/store";
import { toast } from "react-hot-toast";

type CampaignProps = {
    campaignId: string;
    photo: string;
    title: string;
    userName:string;
    amountRaise: number;
    amountGoal: number;
    endDate: Date;
    handler: () => void;
};

const CampaignCard = ({campaignId, amountRaise, userName, title, photo, endDate, amountGoal, handler} : CampaignProps) => {

    const remainingDays = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    const handleShareAndCopy = () => {
        const tweetText = `Check out this amazing campaign: ${title} on Caring Cause!`;
        const tweetUrl = `http://localhost:5173/campaigns/${campaignId}`;
        const tweetUrlEncoded = encodeURIComponent(tweetUrl);
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrlEncoded}`;
        window.open(twitterShareUrl, "_blank");
    
        const campaignLink = `http://localhost:5173/campaigns/${campaignId}`;
        navigator.clipboard.writeText(campaignLink);
        
        navigator.clipboard.writeText(campaignLink).then(() => {
            toast.success("Campaign link copied to clipboard!");
        })
        .catch((error) => {
            toast.error("Failed to copy campaign link to clipboard.");
            console.error("Error copying to clipboard:", error);
        });
      };


  return (
    <div className="campaign-card">
        <img src={`${server}/${photo}`} alt={title} />
        <p className="title">{title}</p>
        <p className="author">Created by: {userName}</p>

        <div className="rating">
            <CircleRating amountRaised={(amountRaise / amountGoal)*100} />
            <span>₹ {amountRaise} raised out of ₹{amountGoal}</span>
        </div>
        

        <span>Remaining time: {remainingDays} days</span>

        <div className="btn">
            <Link className="donation" to={`/donation`} onClick={() => handler()}>
                <span>Donate</span>
            </Link>
            <Link className="share" to={'/'} onClick={handleShareAndCopy}>
                <span>Share</span>
            </Link>
        </div>
    </div>
  )
}

export default CampaignCard