import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('https://ecommerce-node4-five.vercel.app/user/profile', {
          headers: {
            Authorization: `Tariq__${token}`,
          }
        });
        if (response.status === 200 && response.data.message === 'success') {
        setUserData(response.data.user);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {userData && (
        <div className="user-details">
         <p><label>Imge:</label> <img className="user-image" src={userData.image.secure_url} alt="User" /></p> 
           <p><label>ID:</label> {userData._id}</p>
          <p><label>Name:</label> {userData.userName}</p>
          <p><label>Email:</label> {userData.email}</p>
          <p><label>createdAt:</label> {userData.createdAt}</p>
          <p><label>updatedAt:</label> {userData.updatedAt}</p>
         
        </div>
      )}
    </div>
  );
};

export default Profile;

