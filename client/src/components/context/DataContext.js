import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [dateRange, setDateRange] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]); // Stores filtered orders

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/zalando-data');
            setOrders(response.data.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/zalando-data-category');
            setCategories(response.data.items || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Function to filter orders based on selected filters
    const applyFilters = () => {
        let filtered = orders;

        const today = dayjs();
        const startOfWeek = today.startOf("week");
        const startOfMonth = today.startOf("month");
        const startOfYear = today.startOf("year");

        // Date range filter
        if (dateRange === "today") {
            filtered = filtered.filter(order =>
                dayjs(order.attributes.order_date).isSame(today, "day")
            );
        } else if (dateRange === "week") {
            filtered = filtered.filter(order =>
                dayjs(order.attributes.order_date).isAfter(startOfWeek)
            );
        } else if (dateRange === "month") {
            filtered = filtered.filter(order =>
                dayjs(order.attributes.order_date).isAfter(startOfMonth)
            );
        } else if (dateRange === "year") {
            filtered = filtered.filter(order =>
                dayjs(order.attributes.order_date).isAfter(startOfYear)
            );
        }

        // Country filter
        if (country) {
            filtered = filtered.filter(order => order.attributes.shipping_address.country_code === country);
        }

        // Currency filter
        if (currency) {
            filtered = filtered.filter(order => order.attributes.order_lines_price_currency === currency);
        }

        // Category filter
        if (category) {
            filtered = filtered.filter(order => order.attributes.category === category);
        }

        setFilteredOrders(filtered);
    };

    // Effect to refetch data and apply filters when orders change or filter states are updated
    useEffect(() => {
        applyFilters();
    }, [orders, dateRange, country, currency, category]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchOrderDetails(), fetchCategories()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{
            orders: filteredOrders,
            categories,
            loading,
            setDateRange,
            setCountry,
            setCurrency,
            setCategory
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
