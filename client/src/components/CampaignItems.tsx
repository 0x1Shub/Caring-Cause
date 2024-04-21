import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

type CampaignItemsProps = {
    campaignItem : any;
}


const CampaignItems = ({campaignItem}:CampaignItemsProps) => {
    const {photo, campaignId, title, amountRaised, amountGoal} = campaignItem;
  return (
    <div className="campaign-item">
        <img src={photo} alt={title} />
        <span>{title}</span>
        <article>
            <Link to={`/campaign/${campaignId}`}></Link>
            <div>
                <span>Amount Raise: <span>₹{amountRaised}</span></span>
                <br></br>
                <span>Goal Amount : <span>₹{amountGoal}</span></span>
            </div>
        </article>

        {/* <div>
            <button>-</button>
            <p>name</p>
            <button>+</button>
        </div> */}

        <div>
            <Link to={`campaign/edit/${campaignId}`}>
                <MdModeEdit />
            </Link>
        </div>

        <div>

        </div>

        <FaTrash />
    </div>
  )
}

export default CampaignItems