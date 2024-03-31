import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import { useCart } from '../Contextcart/Cart';

const Products = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
  });
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/${productId}`);
      setProduct(data.product);
      setReviews(data.product.reviews);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Error fetching product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleReviewSubmit = async (comment, rating) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(`https://ecommerce-node4-five.vercel.app/products/${productId}/review`,
        {
          comment,
          rating,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
    // console.log(response.data);
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setReviewFormVisible(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'comment' || name === 'rating') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.comment.trim() === '') {
      setError('Comment cannot be empty.');
      return;
    }
    if (formData.rating < 0 || formData.rating > 5) {
      setError('Rating must be between 0 and 5.');
      return;
    }
    setError(null);
    handleReviewSubmit(formData.comment, formData.rating);
  };

  return (
    <>
  <h1>Product</h1>
  {loading ? (
    <div className="loading-spinner">
      <h3>Loading</h3>
    </div>
  ) : (
    <div className="products-container">
      <div key={product._id} className="product-card">
        <img src={product.mainImage.secure_url} alt={product.name} />
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Ratingnumb: {product.ratingNumbers}</p>
        <button className='btn btn-outline-info' onClick={() => addToCart(product._id)}>Add to cart</button>
        <button className='btn btn-outline-info' onClick={() => setReviewFormVisible(true)}>Add Review</button>
      </div>
    </div>
  )}
  {reviewFormVisible && (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" min="0" max="5" value={formData.rating} onChange={handleChange} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )}
  <div className="reviews-list">
    <h2>Reviews</h2>
    <ul>
      {reviews.map((review) => (
        <li key={review._id}>
          <p>Comment: {review.comment}</p>
          <p>Rating: {review.rating}</p>
        </li>
      ))}
    </ul>
  </div>
</>

  );
};

export default Products;
