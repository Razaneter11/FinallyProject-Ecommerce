import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './categoreis.css';

export default function SwiperComponent() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=10');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 4.5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.5,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <h1>Category</h1>
      {loading ? (
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div className='container'>
          <Slider {...sliderSettings}>
            {categories.map(category => (
              <div key={category._id}>
                <Link to={`/products/category/${category._id}`}>
                  <img src={category.image.secure_url} alt={category.name} />
                 
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
