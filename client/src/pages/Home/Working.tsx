import React from "react";

const Working: React.FC = () => {
  return (
    <div className="working">
        <div className="carousel-section">
            <div>
                <span className='carousel-title'>
                    Working of Fundraisers
                </span>
                <p className='text'>
                    Review the working of Fundraisers
                </p>
            </div>
        </div>
        <div className="donation-steps">
            <h2>Steps to Donate</h2>
            <div className="step">
                <div className="step-number">1</div>
                <div className="step-description">Select a campaign you want to support.</div>
            </div>
            <div className="step">
                <div className="step-number">2</div>
                <div className="step-description">Click on the "Donate" button.</div>
            </div>
            <div className="step">
                <div className="step-number">3</div>
                <div className="step-description">Enter the donation amount and other details.</div>
            </div>
            <div className="step">
                <div className="step-number">4</div>
                <div className="step-description">Complete the payment process.</div>
            </div>
        </div>
    </div>
    
  );
};

export default Working;
