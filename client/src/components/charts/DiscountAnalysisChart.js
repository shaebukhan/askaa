import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

Chart.register(ArcElement, Tooltip, Legend);

const DiscountChart = () => {
  const dataOuter = {
    labels: [
      "No Discount",
      "1-10%",
      "11-20%",
      "21-30%",
      "31-40%",
      "41-50%",
      "50%",
    ],
    datasets: [
      {
        label: "Outer Dataset",
        data: [40, 10612, 8235, 2525, 5850, 3850, 12423],
        backgroundColor: [
          "#e9e9e9", // No discount
          "#f0e3d9", // 1-10%
          "#d8b79a", // 11-20%
          "#c18c5e", // 21-30%
          "#896343", // 31-40%
          "#573f2a", // 41-50%
          "#402d21", // 50%
        ],
        hoverBackgroundColor: [
          "#e9e9e9",
          "#f0e3d9",
          "#d8b79a",
          "#c18c5e",
          "#896343",
          "#573f2a",
          "#402d21",
        ],
        borderWidth: 0,
        cutout: "70%",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-4">
      {/* Donut chart container */}
      <div className="w-[260px] h-[260px] relative">
        {/* Outer donut */}
        <Doughnut data={dataOuter} options={options} />

        {/* Inner circle with text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            color: "#3D3D3D",
          }}
        >
          Discount <br /> Segments
        </div>
      </div>

      {/* Right side labels (legend) */}
      <div style={{ marginLeft: "20px", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#e9e9e9] h-[10px]"></span>
            <span className="text-[#BC8452]">No Discount</span>
          </span>
          <span>40</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#f0e3d9] h-[10px]"></span>
            <span className="text-[#BC8452]">1-10%</span>
          </span>
          <span>10,612</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#d8b79a] h-[10px]"></span>
            <span className="text-[#BC8452]">11-20%</span>
          </span>
          <span>8,235</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#c18c5e] h-[10px]"></span>
            <span className="text-[#BC8452]">21-30%</span>
          </span>
          <span>2,525</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#896343] h-[10px]"></span>
            <span className="text-[#BC8452]">31-40%</span>
          </span>
          <span>5850</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#573f2a] h-[10px]"></span>
            <span className="text-[#BC8452]">41-50%</span>
          </span>
          <span>3850</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#402d21] h-[10px]"></span>
            <span className="text-[#BC8452]">50%</span>
          </span>
          <span>12423</span>
        </div>
      </div>
    </div>
  );
};

const DiscountAnalysisChart = () => {
  return (
    <Card className="bg-[#E4CEBA] mt-12 rounded-lg md:p-6 ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="flex justify-between gap-8 ">
          <div>
            <Typography variant="h3" className="text-[#896343]">
              Discount analysis{" "}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#896343] text-lg"
            >
              Number of items sold per discount segment
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="md:p-6 px-2 p-0">
        <DiscountChart />
      </CardBody>
    </Card>
  );
};

export default DiscountAnalysisChart;
