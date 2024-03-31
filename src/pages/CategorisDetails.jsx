import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Products.css'
import axios from 'axios';
export default function CategoryDetails() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${categoryId}`);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [categoryId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container ps-5 ms-5">
            <div className="products">
                <div className="products-container">
                    {products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.mainImage.secure_url} alt={product.name} />
                            <p>Name: {product.name}</p>
                            <Link to={`/products/${product._id}`} className="btn">Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
                    }
