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
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const FooterTabs = [
  {
    label: "Highest ROR",
    value: "highest",
  },
  {
    label: "Lowest ROR",
    value: "lowest",
  },
];

const ReturnAnalysisChart = ({ totalReturns }) => {
  const [footerTabValue, setFooterTabValue] = useState("highest");

  const chartData = {
    series: [
      {
        name: "Last Period",
        data: [44, 55, 57, 56, 75, 77], // Sample data
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "#DEEDBB", // Chart background color
        toolbar: {
          show: false, // Hide toolbar
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Vertical bars
          columnWidth: "40%", // Column width size
          borderRadius: 8, // Rounded bar edges
          endingShape: "rounded",
        },
      },
      colors: ["#CEE49C"], // Bar colors
      dataLabels: {
        enabled: false, // Disable data labels
      },
      grid: {
        show: true, // Show grid
        yaxis: {
          lines: {
            show: true, // Show horizontal grid lines
          },
        },
        xaxis: {
          lines: {
            show: false, // Hide vertical grid lines
          },
        },
      },
      stroke: {
        show: true, // Show border around bars
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Overall ROR", // Categories for the x-axis
          "Shoes",
          "T-Shirt",
          "Boots",
          "Hats",
          "Long Sleeves",
        ],
      },
      yaxis: {
        title: {
          text: "Return Rate",
          style: {
            color: "#7E9746",
            fontSize: "20px",
          },
        },
      },
      fill: {
        opacity: 1, // Full bar fill
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} % items`, // Tooltip formatting
        },
      },
    },
  };

  return (
    <Card className="bg-[#DEEDBB] rounded-lg md:p-6 p-1">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-inherit">
        <div className="flex justify-between gap-8 ">
          <div>
            <Typography variant="h3" className="text-[#7E9746]">
              Return Analysis
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#7E9746] text-lg"
            >
              Return rate within the selected time period
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="md:p-6 px-2 pb-0">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={300} // Adjust the chart height
        />
      </CardBody>
      <CardFooter className="flex justify-center pt-0 mt-0">
        <Tabs value={footerTabValue} className="w-full md:w-[300px]">
          <TabsHeader
            className="bg-[#CEE49C] rounded-full p-0"
            indicatorProps={{
              className: `bg-[#7E9746] shadow-none rounded-full`,
            }}
          >
            {FooterTabs.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setFooterTabValue(value)}
                className={
                  footerTabValue === value ? "text-white" : "text-[#7E9746]"
                }
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </CardFooter>
    </Card>
  );
};

export default ReturnAnalysisChart;
