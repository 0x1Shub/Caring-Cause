import { Link } from "react-router-dom"

import caringCauseLogo from '../assets/caringCause-logo.png';
import { HiOutlineSearch} from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";

const user = {_id: "", role: ""};


const Navbar = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

    const logoutHandler = () => {
        setIsOpen(false);
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
          <Link className="link" to={'/campaigns/create'}>Start a Fundraiser</Link>
          <Link className="link" to={'/fundraisers'}>Donation</Link>
          <Link className="link" to={'/'}>How it Works</Link>
          <Link to={'/search'} className="link">
              <HiOutlineSearch className="searchIcon" />
          </Link>


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
                                <dialog open={isOpen}>
                                    <Link onClick={() => setIsOpen(false)} to={'/login'}>Log In</Link>
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