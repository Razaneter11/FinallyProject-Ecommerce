import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Link } from 'react-router-dom'; // استيراد مكون التوجيه

const Order = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    couponName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null); 
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('https://ecommerce-node4-five.vercel.app/cart', {
          headers: {
            Authorization: `Tariq__${token}`,
          }
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    getCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('https://ecommerce-node4-five.vercel.app/order', {
        products: cart.products,
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        couponName: formData.couponName,
      }, { headers: { Authorization: `Tariq__${token}` } });
      
      if (response.data.message == 'success') {
        setOrderId(response.data.order._id)
      }
      console.log('Order placed successfully:', response.data);
      toast.success('Order Successfully', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error placing order:', error);
    }
    setLoading(false);
  };

  return (
    <div className="order-page">
      <h2>Order</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
 
      </form>
  
    </div>
  );
};

export default Order;
