import React, { useEffect, useState } from "react";
import MainColumnChart from "./MainColumnChart";
import DiscountAnalysisChart from "./DiscountAnalysisChart";
import CategoryPerformanceMatrixChart from "./CategoryPerformanceMatrixChart";
import ReturnAnalysisChart from "./ReturnAnalysisChart";
import StockSplitSalesChart from "./StockSplitSalesChart";
import axios from "axios";

const Chart = () => {


  const [orders, setOrders] = useState([]); // Ensure orders is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get('http://localhost:5000/api/zalando-data');
      // Correctly access the nested data
      const fetchedOrders = Array.isArray(response.data.data) ? response.data.data : [];
      setOrders(fetchedOrders); // Set the state with the correct data
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/EUR')
      .then(response => {
        setExchangeRates(response.data.rates); // setExchangeRates to store rates dynamically
      })
      .catch(error => {
        console.error("Error fetching exchange rates", error);
      });
  }, []);



  const totalData = orders.reduce((totals, order) => {
    const { order_lines_price_currency: currency, order_lines_price_amount: amount, order_lines_count: itemsCount } = order.attributes;
    const amountInEUR = parseFloat(amount);

    // Use exchange rate for the order's currency, defaulting to 1 if currency is EUR or unknown
    const rate = exchangeRates[currency] ? (1 / exchangeRates[currency]) : 1;

    // Convert the amount to EUR
    const convertedAmount = amountInEUR * rate;

    // Update total sales, total items, and total orders
    totals.totalSales += convertedAmount;
    totals.totalItems += itemsCount;
    totals.totalOrders += 1;

    return totals;
  }, { totalSales: 0, totalItems: 0, totalOrders: 0 });


  return (
    <>
      <MainColumnChart />
      <div className="flex px-4 justify-between gap-8 flex-wrap md:flex-row flex-col mt-12">
        <div className="md:w-[45%] w-full">
          <DiscountAnalysisChart />
        </div>
        <div className="md:w-[45%] w-full">
          <CategoryPerformanceMatrixChart />
        </div>
      </div>
      <div className="flex px-4 justify-between gap-8 flex-wrap mt-12 md:flex-row flex-col">
        <div className="md:w-[45%] w-full">
          <ReturnAnalysisChart />
        </div>
        <div className="md:w-[45%] w-full">
          <StockSplitSalesChart />
        </div>
      </div>
    </>
  );
};

export default Chart;
