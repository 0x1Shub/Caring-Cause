import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import caringCauseLogo from '../assets/caringCause-logo.png';
import { auth } from "../firebase";
import { User } from "../types/types";

// import { getCampaignSuggestions } from "../api"; // Function to call backend API


interface PropsType {
  user: User | null
}


const Navbar = ({user} : PropsType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [searchQuery, setSearchQuery] = useState<string>("");

  // const handleSearch = async () => {
  //   try {
  //     const response = await getCampaignSuggestions(searchQuery); // Call backend API
  //     // Handle the response, e.g., show suggestions in a dropdown
  //     console.log(response);
  //   } catch (error) {
  //     toast.error("Failed to fetch search suggestions");
  //   }
  // };


    const logoutHandler = async () => {
        try{
          await signOut(auth);
          toast.success("Sign Out Successfully");
          setIsOpen(false);
        }catch(error){
          toast.error("Sign Out Failed")
        }
    }


  return (
    <nav className="navbar">

      {/* Navbar Logo */}
      <div className="navbar-content">
        <Link to={'/'} className="logo">
          <img src={caringCauseLogo} alt="Logo." />
          <span>Caring Cause</span>
        </Link>
      </div>
      
      {/* NavBar Items */}
      <div className={'nav-items'}>
          <Link className="link" to={'/'}>Home</Link>
          <div className="fundraiser">
            <Link className="link" to={'/campaigns/create'}>Start a Fundraiser</Link>
          </div>
          
          <Link className="link" to={'/campaigns'}>Donate</Link>
          <Link className="link" to={'/working'}>How it Works</Link>


          <Link to={'/search'} className="link">
              <HiOutlineSearch className="searchIcon" />
          </Link>

          {/* <div className="link">
            <input
              type="text"
              placeholder="Search campaigns"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
              <button onClick={handleSearch}>
                  <HiOutlineSearch />
              </button>
          </div> */}


          {/* Navbar Users */}

          <div className="menu">
            {user?._id ? (
                <>
                  <HiOutlineUserCircle className="userIcon" onClick={() => setIsOpen((prev) => !prev)} />
                      <dialog open={isOpen}>
                        <div>
                        {user.role === 'admin' && (
                          <Link onClick={() => setIsOpen(false)} to={'/admin/dashboard'}>Admin</Link>
                        )} 
                          <Link onClick={() => setIsOpen(false)} to={'/profile'}>View Profile</Link>
                          <Link onClick={() => setIsOpen(false)} to={'/profile/fundraisers'}>My Fundraisers</Link>
                          <Link onClick={() => setIsOpen(false)} to={'/profile/donations'}>My Donations</Link>
                          <Link onClick={logoutHandler} to={'/logout'}>Log out</Link>
                        </div>
                          
                      </dialog>
                </>
                  
                ) : (
                            <>
                              <HiOutlineUserCircle className="userIcon" onClick={() => setIsOpen((prev) => !prev)} />
                              <div className="drop-down">
                                <dialog open={isOpen} className="authenticate">
                                    <Link onClick={() => setIsOpen(false)} to={'/login'}>Log In</Link><br></br>
                                    <Link onClick={() => setIsOpen(false)} to={'/signup'}>Sign Up</Link>
                                </dialog>
                              </div> 
                            </>
                        )}
                  </div>

              </div>

    </nav>
  )
}

export default Navbar