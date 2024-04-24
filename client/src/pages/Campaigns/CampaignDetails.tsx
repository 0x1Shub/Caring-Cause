// import { useState, useEffect } from "react";
// import { FaDonate, FaShare } from "react-icons/fa";
// import axios from "axios"; // Assuming you're using Axios for HTTP requests

// const CampaignDetail = ({ match }) => {
//     const [campaign, setCampaign] = useState(null);
//     const [donationAmount, setDonationAmount] = useState("");

//     useEffect(() => {
//         // Fetch campaign details from the backend using the provided ID
//         const fetchCampaign = async () => {
//             try {
//                 const response = await axios.get(`/api/campaigns/${match.params.id}`);
//                 setCampaign(response.data);
//             } catch (error) {
//                 console.error("Error fetching campaign:", error);
//             }
//         };

//         fetchCampaign();
//     }, [match.params.id]);

//     const handleDonation = () => {
//         // Add your donation logic here
//         console.log(`Donated ${donationAmount} to ${campaign.title}`);
//     };

//     const handleShare = () => {
//         // Add your share logic here
//         console.log(`Shared ${campaign.title}`);
//     };

//     if (!campaign) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="campaign-detail">
//             <img src={campaign.imageUrl} alt={campaign.title} />
//             <h2>{campaign.title}</h2>
//             <p>{campaign.description}</p>
//             {/* Display other campaign details here */}

//             {/* Donation section */}
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Enter donation amount"
//                     value={donationAmount}
//                     onChange={(e) => setDonationAmount(e.target.value)}
//                 />
//                 <button onClick={handleDonation}>
//                     <FaDonate />
//                     Donate
//                 </button>
//             </div>

//             {/* Share button */}
//             <button onClick={handleShare}>
//                 <FaShare />
//                 Share
//             </button>
//         </div>
//     );
// };

// export default CampaignDetail;
