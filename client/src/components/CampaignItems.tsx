import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CampaignItemsProps = {
    campaignItem : any;
}


const CampaignItems = ({campaignItem}:CampaignItemsProps) => {
    const {photo, campaignId, title, amountRaise, days} = campaignItem;
  return (
    <div className="campaign-item">
        <img src={photo} alt={title} />
        <span>{title}</span>
        <article>
            <Link to={`/campaign/:id${campaignId}`}></Link>
            <span>₹{amountRaise}</span>
        </article>

        <div>
            <button>-</button>
            <p>name</p>
            <button>+</button>
        </div>

        <FaTrash />
    </div>
  )
}

export default CampaignItems