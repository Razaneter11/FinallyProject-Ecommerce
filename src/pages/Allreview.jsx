import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://ecommerce-node4-five.vercel.app/products/${productId}/review');
        console.log(response.data.review);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>All Reviews</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.title}</h3>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllReview;
