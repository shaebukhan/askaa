import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import { FiCalendar } from "react-icons/fi";
import Datepicker from "react-tailwindcss-datepicker";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useData } from "./context/DataContext";

const Filters = () => {
  const [value, setValue] = useState(""); // For custom date range selection
  const [selectedDateRange, setSelectedDateRange] = useState(""); // For display purposes

  const {
    orders,
    categories,
    setDateRange,
    setCountry,
    setCurrency,
    setCategory
  } = useData();

  countries.registerLocale(enLocale);

  const getCountryName = (code) => {
    return countries.getName(code, "en") || code;
  };

  // Handle setting the date range and updating context
  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range); // Display selected range in dropdown label
    if (range === "custom") {
      setDateRange(value); // Use custom date value if chosen
    } else {
      setDateRange(range);
    }
  };

  return (
    <div className="p-[16px] flex justify-between items-center py-8 flex-wrap">
      <span className="text-[30px] font-[600]">Sales Insights</span>
      <div className="flex items-center md:gap-3 gap-2 flex-wrap">
        {/* Custom date range picker */}
        {selectedDateRange === "custom" && (
          <Datepicker
            value={value}
            useRange={false}
            onChange={(newValue) => {
              setValue(newValue);
              setDateRange(newValue); // Update context with custom date range
            }}
          />
        )}

        {/* Date Range Dropdown */}
        <Dropdown
          color="gray"
          label={
            <div className="flex items-center gap-1">
              <FiCalendar />
              <span>{selectedDateRange || "Date Range"}</span>
            </div>
          }
          arrowIcon={false}
        >
          {["today", "week", "month", "year", "custom"].map((range) => (
            <Dropdown.Item
              key={range}
              onClick={() => handleDateRangeChange(range)}
              className={`cursor-pointer ${selectedDateRange === range ? "bg-gray-200" : "bg-white"
                }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Dropdown.Item>
          ))}
        </Dropdown>

        {/* Country Dropdown */}
        <Dropdown color="gray" label="Country">
          {orders?.length > 0 ? (
            [...new Set(orders.map(order => order.attributes.shipping_address.country_code))].map((countryCode, index) => (
              <Dropdown.Item key={index} onClick={() => setCountry(countryCode)}>
                {getCountryName(countryCode)}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No Data Available</Dropdown.Item>
          )}
        </Dropdown>

        {/* Currency Dropdown */}
        <Dropdown color="gray" label="Currency">
          {orders?.length > 0 ? (
            [...new Set(orders.map(order => order.attributes.order_lines_price_currency))].map((currency, index) => (
              <Dropdown.Item key={index} onClick={() => setCurrency(currency)}>
                {currency}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No Data Available</Dropdown.Item>
          )}
        </Dropdown>

        {/* Category Dropdown */}
        <Dropdown color="gray" label="Category">
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => setCategory(category.label)}
              >
                {category.name.en}
                {/* {category.label} */}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No Categories Found</Dropdown.Item>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default Filters;
