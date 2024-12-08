import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import api from '../../services/apiService';

const ProductPage = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/products/Type/${category}`);
                setProducts(response.data); // Set products from response data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [category]);

    const handleAddToCart = (product) => {
        const quantity = quantities[product.ProductID] || 1; // Default to 1 if not set
        const cartItem = { id: product.ProductID, name: product.Name, price: product.Price, quantity };

        // Get the current cart from local storage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add or update the item in the cart
        const updatedCart = currentCart.filter(item => item.id !== product.ProductID).concat(cartItem);
        
        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${product.Name} added to cart!`);
    };

    const handleQuantityChange = (productID, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productID]: value < 1 ? 1 : value, // Ensure at least 1 quantity
        }));
    };

    return (
        <div className="product-page">
            <h1>{category} Products</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.ProductID} className="product-item">
                            <img src={`/images/${category.toLowerCase()}/${product.Name}.png`} alt={product.Name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.Name}</h3>
                                <p>${product.Price}</p>
                            </div>
                            <div className="quantity-selector">
                                <label htmlFor={`quantity-${product.ProductID}`}>Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${product.ProductID}`}
                                    value={quantities[product.ProductID] || 1}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(product.ProductID, parseInt(e.target.value))}
                                />
                            </div>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No {category.toLowerCase()} products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
