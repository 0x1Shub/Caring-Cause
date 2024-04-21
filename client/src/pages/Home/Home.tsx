import CampaignCard from "../../components/CampaignCard"
import Footer from "./Footer"
import HeroBanner from "./Herobanner"
import Trending from "./Trending"



const Home = () => {

  const addToCartHandler = () => {

  }

  return (
    <div className="home">
      <HeroBanner/>
      <Trending />
      <CampaignCard campaignId="asa" name="John Doe" title="Education" amount={5000} goalAmount={25000} days={35} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg" />

      <Footer />
    </div>
  )
}

export default Home