import { toast } from "react-hot-toast"
import CampaignCard from "../../components/CampaignCard"
import { Skeleton } from "../../components/Loader"
import { useLatestCampaignsQuery } from "../../redux/api/campaignAPI"
import Footer from "./Footer"
import HeroBanner from "./Herobanner"
import Trending from "./Trending"



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
            <CampaignCard key={i._id} campaignId={i._id} name="Jon deo" title={i.title} amount={5000} goalAmount={i.amountGoal} days={Number(i.days)} handler={addToCartHandler} photo={i.photo} />
          ))
        }
      </main>

      <Footer />
    </div>
  )
}

export default Home 