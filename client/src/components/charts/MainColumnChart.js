import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const TABS = [
  { label: "Value", value: "value" },
  { label: "Quantity", value: "quantity" },
];
const FooterTabs = [
  { label: "Days", value: "days" },
  { label: "Weeks", value: "week" },
  { label: "Months", value: "months" },
];

const MainColumnChart = () => {
  const [tabValue, setTabValue] = useState("value");
  const [footerTabValue, setFooterTabValue] = useState("days");
  const [orders, setOrders] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Fetch order details from backend
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/zalando-data");
      const fetchedOrders = Array.isArray(response.data.data) ? response.data.data : [];
      setOrders(fetchedOrders);
    } catch (err) {
      setError("Error fetching orders");
      console.error("Order Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/EUR");
      setExchangeRates(response.data.rates);
    } catch (err) {
      console.error("Exchange Rate Fetch Error:", err);
    }
  };

  // Calculate total sales for the last 10 months
  const calculateMonthlySales = () => {
    const totalsByMonth = Array(10).fill(0); // Create an array for 10 months
    const currentMonth = new Date().getMonth();

    orders.forEach((order) => {
      const {
        order_lines_price_currency: currency,
        order_lines_price_amount: amount,
      } = order.attributes;

      const orderDate = new Date(order.attributes.created_at);
      const month = orderDate.getMonth();
      const amountInEUR = parseFloat(amount);
      const rate = exchangeRates[currency] ? 1 / exchangeRates[currency] : 1;
      const convertedAmount = amountInEUR * rate;
      // Place sales data into the appropriate month index
      const monthIndex = (currentMonth - month + 10) % 10;
      totalsByMonth[monthIndex] += convertedAmount;
    });
    return totalsByMonth.reverse(); // Ensure correct order from oldest to newest
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && Object.keys(exchangeRates).length > 0) {
      const monthlySales = calculateMonthlySales();

      // Update the chart data dynamically based on fetched data
      setChartData({
        series: [
          {
            name: "Sales",
            data: monthlySales,
          },
        ],
        options: {
          chart: {
            type: "bar",
            background: "#9DDEB9",
            toolbar: { show: false },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "40%",
              borderRadius: 8,
              endingShape: "rounded",
            },
          },
          colors: ["#70CE98"],
          dataLabels: { enabled: false },
          grid: {
            yaxis: { lines: { show: false } },
            xaxis: { lines: { show: false } },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
          },
          xaxis: {
            categories: [
              "Jan", "Feb", "Mar", "Apr", "May",
              "Jun", "Jul", "Aug", "Sep", "Oct",
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            title: {
              text: "Sales Amount (€)",
              style: { color: "#147E41" },
            },
          },
          tooltip: {
            y: { formatter: (val) => `€ ${val.toFixed(2)}` },
          },
          responsive: [
            {
              breakpoint: 450,
              options: { chart: { width: 1119 } },
            },
          ],
        },
      });
    }
  }, [orders, exchangeRates]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4">
      <Card className="bg-[#9DDEB9] mt-12 rounded-lg md:p-6 p-2">
        <CardHeader floated={false} shadow={false} className="bg-inherit">
          <div className="flex justify-between gap-5 md:flex-row flex-col">
            <div>
              <Typography variant="h3" className="text-[#147E41]">
                Total Sales
              </Typography>
              <Typography className="text-[#147E41] text-lg">
                Total Sales vs Same Period Last Year
              </Typography>
            </div>
            <Tabs value={tabValue} className="w-full md:w-max">
              <TabsHeader className="bg-[#C9EDD8] p-0">
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setTabValue(value)}
                    className={
                      tabValue === value ? "text-[#C9EDD8]" : "text-[#1DAC5A]"
                    }
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className="md:p-6 px-2 overflow-x-auto">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={400}
          />
        </CardBody>
        <CardFooter className="flex justify-center pt-0">
          <Tabs value={footerTabValue} className="w-full md:w-max">
            <TabsHeader className="bg-[#C9EDD8] rounded-full p-0">
              {FooterTabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setFooterTabValue(value)}
                  className={
                    footerTabValue === value
                      ? "text-[#C9EDD8]"
                      : "text-[#1DAC5A]"
                  }
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MainColumnChart;
