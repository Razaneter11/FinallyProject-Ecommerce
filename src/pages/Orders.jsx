import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css'; 


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(""); 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('https://ecommerce-node4-five.vercel.app/order', {
        headers: { Authorization: `Tariq__${token}` }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const removeOrder = async (orderId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.patch(`https://ecommerce-node4-five.vercel.app/order/cancel/${orderId}`, null, {
        headers: { Authorization: `Tariq__${token}` }
      });

      if (response.data.message === 'success') {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        setOrderId(orderId); 
        toast.success('Order Cancelled Successfully', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      console.log('Order cancelled successfully:', response.data);
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Error Cancelling Order', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {loading && <p>Loading...</p>}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Coupon Name</th>
            <th>Actions</th> {/* إضافة عمود جديد للأوامر */}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.products.join(', ')}</td>
              <td>{order.fullName}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{order.couponName}</td>
              
              <td>
                <button onClick={() => removeOrder(order._id)}>Cancel Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default Orders;
