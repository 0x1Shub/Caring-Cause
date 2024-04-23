import { Link } from "react-router-dom"

import education from '../../assets/Categories/Education.png'
import medical from '../../assets/Categories/Medical.png'
import memorial from '../../assets/Categories/Memorial.png'
import children from '../../assets/Categories/Children.png'
import animal from '../../assets/Categories/Animal.png'
import other from '../../assets/Categories/Other.png'

const MoreCategories = () => {
  return (
    <div className='carousel-section'>
      <div>
        <span className='carousel-title'>
            More Fundraisers
        </span>
        <p className='text'>
            View the fundraisers across diffrent categories
        </p>
      </div>


        <div className="category-component">
            <div className="category-grid">
                <Link to="/search?category=education">
                    <img src={education} alt="Education" />
                    <span>Education</span>
                </Link>
                <Link to="/search?category=medical">
                    <img src={medical} alt="doctors-bag--v1"/>
                    <span>Medical</span>
                </Link>
                <Link to="/search?category=memorial">
                    <img src={memorial} alt="Memorial" />
                    <span>Memorial</span>
                </Link>
                <Link to="/search?category=children">
                    <img src={children} alt="Children" />
                    <span>Children</span>
                </Link>
                <Link to="/search?category=animal">
                    <img src={animal} alt="Animal" />
                    <span>Animal</span>
                </Link>
                <Link to="/search?category=other">
                    <img src={other} alt="Other" />
                    <span>Other</span>
                </Link>
            </div>
        </div>
        

        <div>
            <span className='carousel-title'>
                Create Campaign
            </span>
            <p className='text'>
                Create the campaigns across diffrent categories
            </p>
        </div>


        <div className="category-component">
            <div className="category-grid">
                <Link to="/search?category=education">
                    <img src={education} alt="Education" />
                    <span>Education</span>
                </Link>
                <Link to="/search?category=medical">
                    <img src={medical} alt="doctors-bag--v1"/>
                    <span>Medical</span>
                </Link>
                <Link to="/search?category=memorial">
                    <img src={memorial} alt="Memorial" />
                    <span>Memorial</span>
                </Link>
                <Link to="/search?category=children">
                    <img src={children} alt="Children" />
                    <span>Children</span>
                </Link>
                <Link to="/search?category=animal">
                    <img src={animal} alt="Animal" />
                    <span>Animal</span>
                </Link>
                <Link to="/search?category=other">
                    <img src={other} alt="Other" />
                    <span>Other</span>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default MoreCategories;