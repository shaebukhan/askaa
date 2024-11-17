
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { useData } from '../context/DataContext';
const Atable = () => {
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const { orders, loading } = useData();

    const handlePageClick = ({ selected }) => setCurrentPage(selected);

    const startIndex = currentPage * itemsPerPage;
    const currentItems = orders.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="main-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>City</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {currentItems.length > 0 ? (
                        currentItems.map((order, index) => (
                            <tr key={index} className={`bg-white ${index % 2 === 0 ? 'bg-green-50' : ''}`}>
                                <td><Link to={`/order/${order.id}`}>{order.id}</Link> </td>
                                <td>{order.attributes.order_number}</td>
                                <td>{new Date(order.attributes.order_date).toLocaleString()}</td>
                                <td>{order.attributes.status}</td>
                                <td>{`${order.attributes.shipping_address.first_name} ${order.attributes.shipping_address.last_name}`}</td>
                                <td>{order.attributes.shipping_address.city}</td>
                                <td>{`${order.attributes.order_lines_price_amount} ${order.attributes.order_lines_price_currency}`}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr className="table-footer">
                        <td colSpan="7">
                            <div className="pagination-container">
                                <span className="page-info">
                                    Page {currentPage + 1} of {Math.ceil(orders.length / itemsPerPage)}
                                </span>
                                <ReactPaginate
                                    previousLabel="Previous"
                                    nextLabel="Next"
                                    onPageChange={handlePageClick}
                                    pageCount={Math.ceil(orders.length / itemsPerPage)}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    forcePage={currentPage}
                                />
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Atable;
