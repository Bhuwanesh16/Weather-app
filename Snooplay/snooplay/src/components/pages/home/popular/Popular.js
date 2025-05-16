import "./Popular.css";
import Product from '../../home/Products/Product';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Popular() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/products");
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = (category) => {
        setActiveFilter(category);
        // Add filtering logic here when you have categories in your products
    };

    if (loading) {
        return (
            <section className="homeProducts">
                <div className="container-fluid text-center">
                    <h2>Loading products...</h2>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="homeProducts">
                <div className="container-fluid text-center">
                    <h2 className="text-danger">{error}</h2>
                    <button className="btn btn-primary mt-3" onClick={fetchProducts}>
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="homeProducts">
            <div className="container-fluid">
                <div className="d-flex align-items-center pop">
                    <h2 className="hd mb-0 mt-0">Popular Products</h2>
                    <div className="list">
                        <ul className="list-inline ml-auto filterTabs">
                            {['All', 'Toys', 'Playing', 'Time Management', 'Managing Finances', 'Puzzles'].map((category) => (
                                <li key={category} className="list-inline-item">
                                    <a 
                                        className={`cursor ${activeFilter === category ? 'active' : ''}`}
                                        onClick={() => filterProducts(category)}
                                    >
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="products-container">
                {data.length === 0 ? (
                    <div className="text-center w-100">
                        <h3>No products found</h3>
                    </div>
                ) : (
                    data.map((item, index) => (
                        <Product key={item.id || index} data={item} />
                    ))
                )}
            </div>
        </section>
    );
}