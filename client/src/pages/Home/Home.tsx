import CampaignCard from "../../components/CampaignCard"
import HeroBanner from "./Herobanner"
import Trending from "./Trending"



const Home = () => {

  const addToCartHandler = () => {

  }

  return (
    <div className="home">
      <HeroBanner/>
      <Trending />
      <CampaignCard campaignId="asa" title="Education" amount={100000} days={35} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg" />
    </div>
  )
}

export default Home