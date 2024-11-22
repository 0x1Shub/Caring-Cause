import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineHeart, HiOutlineInformationCircle, HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import caringCauseLogo from '../assets/caringCause-logo.png';
import { auth } from "../firebase";
import { User } from "../types/types";


// import { getCampaignSuggestions } from "../api"; // Function to call backend API


interface PropsType {
  user: User | null
}


const Navbar = ({user} : PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/campaigns?search=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Failed to fetch search results");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch search results");
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);
  
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    <nav className="bg-[#93c5fd] fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-2">

        {/*NavLeft:  Navbar Logo */}
        <div className="flex items-center">
          <Link to={'/'} className="flex items-center space-x-1">
            <img src={caringCauseLogo} alt="Caring Cause Logo" className="w-12 h-12" />
            <span className="text-[#1e3a8a] text-xl font-bold">Caring Cause</span>
          </Link>
        </div>

        {/* Navbar Middle: Fundraise and Donate */}
        <div className="flex items-center space-x-8">
          {/* Fundraise Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => toggleDropdown('fundraise')}
            onMouseLeave={() => setTimeout(() => toggleDropdown(''), 200)} // Delay to avoid sudden closure
          >
            <span className="text-[#374151] font-semibold cursor-pointer flex items-center">
              Fundraise {openDropdown === 'fundraise' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </span>
            {openDropdown === 'fundraise' && (
              <div className="absolute bg-white shadow-lg mt-0 rounded-md p-5 w-60 z-50">
                <h3 className="text-[#1e3a8a] font-bold flex items-center">
                  <HiOutlineHeart className="mr-2" /> Fundraise Options
                </h3>
                <Link to="/campaigns/start" className="block mt-3 text-darkBlue">
                  Start a Campaign
                </Link>
                <Link to="/campaigns/view" className="block mt-3 text-darkBlue">
                  View Fundraisers
                </Link>
              </div>
            )}
          </div>

          {/* Donate Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => toggleDropdown('donate')}
            onMouseLeave={() => setTimeout(() => toggleDropdown(''), 200)}
          >
            <span className="text-[#374151] font-semibold cursor-pointer flex items-center">
              Donate {openDropdown === 'donate' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </span>
            {openDropdown === 'donate' && (
              <div className="absolute bg-white shadow-lg mt-0 rounded-md p-5 w-60 z-50">
                <h3 className="text-[#1e3a8a] font-bold flex items-center">
                  <HiOutlineHeart className="mr-2" /> Donate Options
                </h3>
                <Link to="/donate" className="block mt-3 text-darkBlue">
                  Donate Now
                </Link>
                <Link to="/causes" className="block mt-3 text-darkBlue">
                  Browse Causes
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Search Input Box */}
        <div className="relative flex items-center">
            <HiOutlineSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search campaigns"
              className="pl-10 pr-10 py-2 bg-gray-200 rounded-full focus:outline-none text-darkBlue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <button onClick={handleSearch} className="ml-2 bg-lightGreen text-[#374151] py-2 px-4 rounded-full">Search</button> */}
        </div>

        {/* Navbar Right: About, Start Fundraiser and User Icon */}
        <div className="flex items-center space-x-8  mr-[10px]">

          {/* About Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => toggleDropdown('about')}
            onMouseLeave={() => setTimeout(() => toggleDropdown(''), 200)}
          >
            <span className="text-[#374151] font-semibold cursor-pointer flex items-center">
              About {openDropdown === 'about' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </span>
            {openDropdown === 'about' && (
              <div className="absolute bg-white shadow-lg mt-0 rounded-md p-5 w-60 z-50">
                <h3 className="text-[#1e3a8a] font-bold flex items-center">
                  <HiOutlineInformationCircle className="mr-2" /> About Us
                </h3>
                <Link to="/team" className="block mt-3 text-darkBlue">
                  Our Team
                </Link>
                <Link to="/mission" className="block mt-3 text-darkBlue">
                  Our Mission
                </Link>
              </div>
            )}
          </div>


          {/* Start a Campaign Button */}
          <Link to={'/campaigns/start'} className="bg-[#fbbf24] text-[#374151] py-2 px-4 rounded-full border border-[#f97316] shadow-md">
            Start a Campaign
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <HiOutlineUserCircle className="text-[#374151] w-8 h-8 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2">
                {user ? (
                  <>
                    <Link to={'/profile'} className="block px-4 py-2 text-darkBlue" onClick={() => setIsOpen(false)}>Profile</Link>
                    <Link to={'/profile/fundraisers'} className="block px-4 py-2 text-darkBlue" onClick={() => setIsOpen(false)}>My Fundraisers</Link>
                    <Link to={'/profile/donations'} className="block px-4 py-2 text-darkBlue" onClick={() => setIsOpen(false)}>My Donations</Link>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-red-500">Log out</button>
                  </>
                ) : (
                  <>
                    <Link to={'/login'} className="block px-4 py-2 text-darkBlue" onClick={() => setIsOpen(false)}>Sign In</Link>
                    <Link to={'/signup'} className="block px-4 py-2 text-darkBlue" onClick={() => setIsOpen(false)}>Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar