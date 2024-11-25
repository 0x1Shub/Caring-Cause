import { Link } from "react-router-dom";
import LazyLoadingImage from "../../components/LazyLoadingImage";
import backgroundImage from "../../assets/background.jpg";

const HeroBanner = () => {
  return (
    <div className="relative flex flex-wrap min-h-[80vh] justify-between mt-20">
      {/* Left Section: Background Image */}
      <div className="w-full md:w-1/2 relative">
        <LazyLoadingImage
          src={backgroundImage}         
          className="w-full h-full object-cover"
        />
        {/* Optional Overlay for styling */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-transparent"></div> */}
      </div>

      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Welcome to Caring Cause
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-700">
            Your Generosity, Their Hope.
          </p>
          <div className="mt-6">
            <Link
              to={"/campaigns/create"}
              className="inline-block bg-gradient text-black px-6 py-3 font-medium text-lg rounded-lg shadow-md hover:bg-gradient-to-t hover:from-[#da2f68] hover:to-[#f89e00] transition-colors"
            >
              Start a campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
