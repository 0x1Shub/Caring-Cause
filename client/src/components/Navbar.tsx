import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import caringCauseLogo from '../assets/caringCause-logo.png';
import { auth } from "../firebase";
import { User } from "../types/types";

import { RiArrowDropDownLine } from "react-icons/ri";

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
    <nav className="navbar">

      {/* Navbar Left:  Logo */}
      <div className="navbar-left">
        <Link to={'/'} className="logo">
          <img src={caringCauseLogo} alt="Logo." />
          <span>Caring Cause</span>
        </Link>
      </div>

      {/* Navbar Middle: Fundraise, Donate and Search */}
      <div className="navbar-middle">
        <div className="nav-items">
          {/* Fundraiser Dropdown */}
          <div className="dropdown">
          <Link className="link" to={'/campaigns/create'}>Fundraise</Link>
            <span className="dropdown-icon">
              <RiArrowDropDownLine />
            </span>
            <div className="dropdown-content">
              {/* <Link to={'/campaigns/start'}>Start a Campaign</Link>
              <Link to={'/campaigns/view'}>View Fundraisers</Link> */}
            </div>
          </div>

          {/* Donate Dropdown */}
          <div className="dropdown">
          <Link className="link" to={'/campaigns/donate'}>Donate</Link>
            <span className="dropdown-icon">
              <RiArrowDropDownLine />
            </span>
            <div className="dropdown-content">
              {/* <Link to={'/campaigns/start'}>Start a Campaign</Link>
              <Link to={'/campaigns/view'}>View Fundraisers</Link> */}
            </div>
          </div>


          {/* Search Input Box */}
          <div className="search-box">
            <HiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search campaigns"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <button onClick={handleSearch}>Search</button> */}
          </div>

          {/* About Dropdown */}
          <div className="dropdown">
            <Link className="link" to={'/about'}>About</Link>
            <span className="dropdown-icon">
            <RiArrowDropDownLine />
            </span>
            <div className="dropdown-content">
              {/* <Link to={'/team'}>Our Team</Link>
              <Link to={'/mission'}>Our Mission</Link> */}
            </div>
          </div>

        </div>
      </div>

       {/* Navbar Right: Button and User Icon */}
       <div className="navbar-right">
        {/* Start a Campaign Button */}
        <Link to={'/campaigns/start'} className="btn-start-campaign">
          Start a Campaign
        </Link>

        {/* User Icon with Dropdown */}
        <div className="user-menu">
          <HiOutlineUserCircle className="user-icon" onClick={() => setIsOpen((prev) => !prev)} />
          {isOpen && (
            <div className="dropdown-menu">
              {user?._id ? (
                <>
                  <Link to={'/profile'}>Profile</Link>
                  <Link to={'/profile/fundraisers'}>My Fundraisers</Link>
                  <Link to={'/profile/donations'}>My Donations</Link>
                  <button onClick={logoutHandler}>Log out</button>
                </>
              ) : (
                <>
                  <Link to={'/login'}>Sign In</Link>
                  <Link to={'/signup'}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      

    </nav>
  )
}

export default Navbar