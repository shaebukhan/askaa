import React, { useEffect, useState } from "react";
import arrowdown from "../assets/images/arrow-down.png";
import arrowup from "../assets/images/arrow-up.png";
import axios from "axios";
import { useData } from "./context/DataContext";

const StatsCardSection = () => {

  const [exchangeRates, setExchangeRates] = useState([]);

  const { orders, loading } = useData();

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

  // Calculate AOV (Average Order Value)
  const AOV = totalData.totalOrders > 0 ? (totalData.totalSales / totalData.totalOrders) : 0;
  const itpb = totalData.totalOrders > 0 ? (totalData.totalItems / totalData.totalOrders) : 0;

  return (
    <section className="px-[16px] bg-[#FCF9F3] mt-4">
      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="bg-[#CFC8E9] rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-md font-semibold text-[#665A90]">Total sales</h2>
          <h2 className="text-3xl font-bold text-[#665A90] mt-2">{totalData.totalSales.toFixed(2)}€ </h2>
          <h4 className="text-md font-medium text-[#665A90] mt-2">
            <div className="flex">
              <img src={arrowdown} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs last period
            </div>
          </h4>
          <hr className="my-2 border-[#665A90]" />
          <h4 className="text-md font-medium text-[#665A90]">
            <div className="flex">
              <img src={arrowup} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs same period YoY
            </div>
          </h4>
        </div>
        <div className="bg-[#CFC8E9] rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-md font-semibold text-[#665A90]">Total orders</h2>
          <h2 className="text-3xl font-bold text-[#665A90] mt-2">{orders.length}</h2>
          <h4 className="text-md font-medium text-[#665A90] mt-2">
            <div className="flex">
              <img src={arrowup} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs last period
            </div>
          </h4>
          <hr className="my-2 border-[#665A90]" />
          <h4 className="text-md font-medium text-[#665A90]">
            <div className="flex">
              <img src={arrowdown} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs same period YoY
            </div>
          </h4>
        </div>
        <div className="bg-[#CFC8E9] rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-md font-semibold text-[#665A90]">
            Total returns
          </h2>
          <h2 className="text-3xl font-bold text-[#665A90] mt-2">{7}</h2>
          <h4 className="text-md font-medium text-[#665A90] mt-2">
            <div className="flex">
              <img src={arrowdown} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs last period
            </div>
          </h4>
          <hr className="my-2 border-[#665A90]" />
          <h4 className="text-md font-medium text-[#665A90]">
            <div className="flex">
              <img src={arrowup} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs same period YoY
            </div>
          </h4>
        </div>
        <div className="bg-[#CFC8E9] rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-md font-semibold text-[#665A90]">AOV</h2>
          <h2 className="text-3xl font-bold text-[#665A90] mt-2">{AOV.toFixed(2)}€</h2>
          <h4 className="text-md font-medium text-[#665A90] mt-2">
            <div className="flex">
              <img src={arrowup} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs last period
            </div>
          </h4>
          <hr className="my-2 border-[#665A90]" />
          <h4 className="text-md font-medium text-[#665A90]">
            <div className="flex">
              <img src={arrowdown} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs same period YoY
            </div>
          </h4>
        </div>
        <div className="bg-[#CFC8E9] rounded-lg overflow-hidden shadow-lg p-6">
          <h2 className="text-md font-semibold text-[#665A90]">
            Items per basket
          </h2>
          <h2 className="text-3xl font-bold text-[#665A90] mt-2">{itpb.toFixed(0)}</h2>
          <h4 className="text-md font-medium text-[#665A90] mt-2">
            <div className="flex">
              <img src={arrowup} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs last period
            </div>
          </h4>
          <hr className="my-2 border-[#665A90]" />
          <h4 className="text-md font-medium text-[#665A90]">
            <div className="flex">
              <img src={arrowdown} alt="Arrow Down" className="w-4 h-4 mt-1" />{" "}
              22% vs same period YoY
            </div>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default StatsCardSection;
