import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

const DonationPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPIN] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Specify the type as FormEvent<HTMLFormElement>
    e.preventDefault();
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 2000)); // Replace with actual API request
  
      // Display success toast
      toast.success('Donation submitted successfully');
      console.log('Donation submitted:', { cardNumber, expiryDate, cvv, amount, pin });
    } catch (error) {
      // Display error toast
      toast.error('Error submitting donation');
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <div className="donation-page">
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            maxLength={16}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="Enter CVV"
            maxLength={3}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label htmlFor="pin">PIN:</label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPIN(e.target.value)}
            placeholder="Enter PIN"
            maxLength={4}
            required
          />
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationPage;
