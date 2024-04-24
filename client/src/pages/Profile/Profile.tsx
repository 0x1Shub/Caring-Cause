// import React, { useEffect, useState } from "react";
// import { getUserProfile } from "../api"; // Import the function to fetch user profile from the API

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null); // State to hold user data

//   useEffect(() => {
//     // Fetch user profile data when the component mounts
//     const fetchUserProfile = async () => {
//       try {
//         const userProfileData = await getUserProfile(); // Call the API function to fetch user profile
//         setUserData(userProfileData); // Set the fetched user data to state
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile(); // Invoke the fetchUserProfile function
//   }, []);

//   return (
//     <div className="user-profile">
//       <h2>User Profile</h2>
//       {userData ? (
//         <div className="profile-details">
//           <p><strong>User ID:</strong> {userData._id}</p>
//           <p><strong>Name:</strong> {userData.name}</p>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Photo:</strong> {userData.photo}</p>
//           <p><strong>Role:</strong> {userData.role}</p>
//           <p><strong>Gender:</strong> {userData.gender}</p>
//           <p><strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}</p>
//           <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
//           <p><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
//           {/* Add more user details as needed */}
//         </div>
//       ) : (
//         <p>Loading user profile...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
