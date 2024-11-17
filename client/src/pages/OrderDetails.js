import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './OrderDetails.css'; // You can create this CSS file for custom styles
import Header from '../components/Header';
import { useData } from '../components/context/DataContext';

const OrderDetails = () => {
    const { id } = useParams(); // Retrieve id from URL
    const [order, setOrder] = useState(null); // State to store the found order

    const [error, setError] = useState(null); // Error state

    // Function to fetch and find the order by ID

    const { orders, categories, loading } = useData();

    useEffect(() => {
        if (orders.length > 0) {
            // Find the specific order by matching the id from useParams()
            const foundOrder = orders.find(order => order.id === id);
            setOrder(foundOrder || null); // Set the found order or null if not found
        }
    }, [orders, id]);
    return (<>
        <Header />
        <div className="order-details-container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && order && (
                <div className="order-card">
                    <h2>Order Details</h2>
                    <div className="order-detail-item">
                        <strong>Order ID:</strong> <span>{order.id}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Status:</strong> <span>{order.attributes.status}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Order Date:</strong> <span>{new Date(order.attributes.order_date).toLocaleString()}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Customer Email:</strong> <span>{order.attributes.customer_email}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Merchant Order ID:</strong> <span>{order.attributes.merchant_order_id}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Order Price:</strong> <span>{order.attributes.order_lines_price_amount} {order.attributes.order_lines_price_currency}</span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Billing Address:</strong>
                        <span>
                            {`${order.attributes.billing_address.first_name} ${order.attributes.billing_address.last_name}, 
                            ${order.attributes.billing_address.address_line_1}, 
                            ${order.attributes.billing_address.city}`}
                        </span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Shipping Address:</strong>
                        <span>
                            {`${order.attributes.shipping_address.first_name} ${order.attributes.shipping_address.last_name}, 
                            ${order.attributes.shipping_address.address_line_1}, 
                            ${order.attributes.shipping_address.city}`}
                        </span>
                    </div>
                    <div className="order-detail-item">
                        <strong>Logistics Provider:</strong> <span>{order.attributes.logistics_provider_id}</span>
                    </div>
                </div>
            )}
            {!loading && !error && !order && (
                <p>No order found with this ID.</p>
            )}
        </div>
    </>
    );
};

export default OrderDetails;
