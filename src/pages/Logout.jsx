import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Logout = () => {
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
   
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
