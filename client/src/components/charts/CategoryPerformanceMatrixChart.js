// QuadrantChart.js
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// Custom plugin for background colors in quadrants
const quadrantBackgroundPlugin = {
  id: "quadrantBackground",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom, width, height },
    } = chart;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    // Draw each quadrant with different colors
    ctx.save();

    // Top Left - Red
    ctx.fillStyle = "#85A6D5";
    ctx.fillRect(left, top, width / 2, height / 2);

    // Top Right - Blue
    ctx.fillStyle = "#9DC3FB";
    ctx.fillRect(centerX, top, width / 2, height / 2);

    // Bottom Left - Green
    ctx.fillStyle = "#C1D9FC";
    ctx.fillRect(left, centerY, width / 2, height / 2);

    // Bottom Right - Yellow
    ctx.fillStyle = "#E7F1FE";
    ctx.fillRect(centerX, centerY, width / 2, height / 2);

    ctx.restore();
  },
};

const QuadrantChart = () => {
  const data = {
    datasets: [
      {
        label: "Quadrant Data",
        data: [
          { x: -3, y: 5 },
          { x: -2, y: -2 },
          { x: 2, y: 3 },
          { x: 3, y: -3 },
        ],
        borderRadius: 20,
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: true, // Show x-axis ticks
        },
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: true, // Show y-axis ticks
        },
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div>
      <Scatter
        data={data}
        options={options}
        plugins={[quadrantBackgroundPlugin]}
      />
    </div>
  );
};

const CategoryPerformanceMatrixChart = () => {
  return (
    <Card className="bg-[#D5E5FD] mt-12 rounded-lg md:p-6 ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="flex justify-between gap-8 ">
          <div>
            <Typography variant="h3" className="text-[#6F8AB2]">
              Category performance matrix{" "}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#6F8AB2] text-lg"
            >
              Identify the performance of your categories
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="md:p-6 px-2 p-0">
        <QuadrantChart />
      </CardBody>
    </Card>
  );
};

export default CategoryPerformanceMatrixChart;
