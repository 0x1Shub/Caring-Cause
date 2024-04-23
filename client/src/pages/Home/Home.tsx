import { toast } from "react-hot-toast"
import CampaignCard from "../../components/CampaignCard"
import { Skeleton } from "../../components/Loader"
import { useLatestCampaignsQuery } from "../../redux/api/campaignAPI"
import Footer from "./Footer"
import HeroBanner from "./Herobanner"
import Trending from "./Trending"
import MoreCategories from "./MoreCategories"
import Working from "./Working"



const Home = () => {

  const {data, isLoading, isError} = useLatestCampaignsQuery("");

  const addToCartHandler = () => {

  }

  if(isError){
    toast.error("Cannot Fetch the product");
  }

  return (
    <div className="home">
      <HeroBanner/>
      <Trending />
      
      <main className="main">
        {
          isLoading ? <Skeleton width="80vh" /> : 
          data?.campaigns.map((i) => (
            <CampaignCard key={i._id} campaignId={i._id} userName="Jon deo" title={i.title} amountRaise={5000} amountGoal={i.amountGoal} endDate={new Date("2024-05-01")} handler={addToCartHandler} photo={i.photo} />
          ))
        }
      </main>

      <MoreCategories />
      <Working />
      <Footer />
    </div>
  )
}

export default Home 