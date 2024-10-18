import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import caringCauseLogo from '../assets/caringCause-logo.png';
import { auth } from "../firebase";
import { User } from "../types/types";

// import { RiArrowDropDownLine } from "react-icons/ri";

// import { getCampaignSuggestions } from "../api"; // Function to call backend API


interface PropsType {
  user: User | null
}


const Navbar = ({user} : PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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


  return (
    // <nav className="navbar">

    //   {/* Navbar Left:  Logo */}
    //   <div className="navbar-left">
    //     <Link to={'/'} className="logo">
    //       <img src={caringCauseLogo} alt="Logo." />
    //       <span>Caring Cause</span>
    //     </Link>
    //   </div>

    //   {/* Navbar Middle: Fundraise, Donate and Search */}
    //   <div className="navbar-middle">
    //     <div className="nav-items">
    //       {/* Fundraiser Dropdown */}
    //       <div className="dropdown">
    //       <Link className="link" to={'/campaigns/create'}>Fundraise</Link>
    //         <span className="dropdown-icon">
    //           <RiArrowDropDownLine />
    //         </span>
    //         <div className="dropdown-content">
    //           {/* <Link to={'/campaigns/start'}>Start a Campaign</Link>
    //           <Link to={'/campaigns/view'}>View Fundraisers</Link> */}
    //         </div>
    //       </div>

    //       {/* Donate Dropdown */}
    //       <div className="dropdown">
    //       <Link className="link" to={'/campaigns/donate'}>Donate</Link>
    //         <span className="dropdown-icon">
    //           <RiArrowDropDownLine />
    //         </span>
    //         <div className="dropdown-content">
    //           {/* <Link to={'/campaigns/start'}>Start a Campaign</Link>
    //           <Link to={'/campaigns/view'}>View Fundraisers</Link> */}
    //         </div>
    //       </div>


    //       {/* Search Input Box */}
    //       <div className="search-box">
    //         <HiOutlineSearch className="search-icon" />
    //         <input
    //           type="text"
    //           placeholder="Search campaigns"
    //           value={searchQuery}
    //           onChange={(e) => setSearchQuery(e.target.value)}
    //         />
    //         {/* <button onClick={handleSearch}>Search</button> */}
    //       </div>

    //       {/* About Dropdown */}
    //       <div className="dropdown">
    //         <Link className="link" to={'/about'}>About</Link>
    //         <span className="dropdown-icon">
    //         <RiArrowDropDownLine />
    //         </span>
    //         <div className="dropdown-content">
    //           {/* <Link to={'/team'}>Our Team</Link>
    //           <Link to={'/mission'}>Our Mission</Link> */}
    //         </div>
    //       </div>

    //     </div>
    //   </div>

    //    {/* Navbar Right: Button and User Icon */}
    //    <div className="navbar-right">
    //     {/* Start a Campaign Button */}
    //     <Link to={'/campaigns/start'} className="btn-start-campaign">
    //       Start a Campaign
    //     </Link>

    //     {/* User Icon with Dropdown */}
    //     <div className="user-menu">
    //       <HiOutlineUserCircle className="user-icon" onClick={() => setIsOpen((prev) => !prev)} />
    //       {isOpen && (
    //         <div className="dropdown-menu">
    //           {user?._id ? (
    //             <>
    //               <Link to={'/profile'}>Profile</Link>
    //               <Link to={'/profile/fundraisers'}>My Fundraisers</Link>
    //               <Link to={'/profile/donations'}>My Donations</Link>
    //               <button onClick={logoutHandler}>Log out</button>
    //             </>
    //           ) : (
    //             <>
    //               <Link to={'/login'}>Sign In</Link>
    //               <Link to={'/signup'}>Sign Up</Link>
    //             </>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
      

    // </nav>

    <nav className="bg-[#93c5fd] fixed top-0 left-0 w-full shadow-lg z-50">

      <div className="container mx-auto flex items-center justify-between py-2 px-2">

        {/* Navbar Logo */}
        <div className="flex items-center">
          <Link to={'/'} className="flex items-center space-x-1">
            <img src={caringCauseLogo} alt="Caring Cause Logo" className="w-12 h-12" />
            <span className="text-[#1e3a8a] text-xl font-bold">Caring Cause</span>
          </Link>
        </div>


        {/* Navbar Middle: Fundraise and Donate */}

        <div className="flex items-center space-x-8">
          {/* Fundraise Dropdown */}
          <div className="relative group">
            <Link className="text-[#374151] font-semibold cursor-pointer">Fundraise</Link>
            <span className="ml-1 text-[#374151]">▼</span>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md p-2">
              <Link to={'/campaigns/start'} className="block px-4 py-2 text-darkBlue">Start a Campaign</Link>
              <Link to={'/campaigns/view'} className="block px-4 py-2 text-darkBlue">View Fundraisers</Link>
            </div>
          </div>

          {/* Donate Dropdown */}
          <div className="relative group">
            <Link className="text-[#374151] font-semibold cursor-pointer">Donate</Link>
            <span className="ml-1 text-[#374151]">▼</span>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md p-2">
              <Link to={'/donate'} className="block px-4 py-2 text-darkBlue">Donate Now</Link>
              <Link to={'/causes'} className="block px-4 py-2 text-darkBlue">Browse Causes</Link>
            </div>
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

        {/* Navbar Right: Button and User Icon */}
        <div className="flex items-center space-x-8  mr-[10px]">

          {/* About Dropdown */}
          <div className="relative group">
            <Link className="text-[#374151] font-semibold cursor-pointer">About</Link>
            <span className="ml-1 text-[#374151]">▼</span>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md p-2">
              <Link to={'/team'} className="block px-4 py-2 text-darkBlue">Our Team</Link>
              <Link to={'/mission'} className="block px-4 py-2 text-darkBlue">Our Mission</Link>
            </div>
          </div>


          {/* Start a Campaign Button */}
          <Link to={'/campaigns/start'} className="bg-lightGreen text-[#374151] py-2 px-4 rounded-full">
            Start a Campaign
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <HiOutlineUserCircle className="text-[#374151] w-8 h-8 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2">
                {user ? (
                  <>
                    <Link to={'/profile'} className="block px-4 py-2 text-darkBlue">Profile</Link>
                    <Link to={'/profile/fundraisers'} className="block px-4 py-2 text-darkBlue">My Fundraisers</Link>
                    <Link to={'/profile/donations'} className="block px-4 py-2 text-darkBlue">My Donations</Link>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-red-500">Log out</button>
                  </>
                ) : (
                  <>
                    <Link to={'/login'} className="block px-4 py-2 text-darkBlue">Sign In</Link>
                    <Link to={'/signup'} className="block px-4 py-2 text-darkBlue">Sign Up</Link>
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