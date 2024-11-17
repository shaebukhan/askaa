import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Card } from "flowbite-react";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";

Chart.register(ArcElement, Tooltip, Legend);

const DiscountChart = () => {
  const dataOuter = {
    labels: ["top 25%", "25-50%", "51-75%", "Bottom 25%"],
    datasets: [
      {
        label: "Outer Dataset",
        data: [8235, 5850, 3850, 12423],
        backgroundColor: [
          "#ad7e00", // No discount
          "#c7a54d", // 1-10%
          "#e8dbb8", // 11-20%
          "#f1e9d4", // 50%
        ],
        hoverBackgroundColor: ["#ad7e00", "#c7a54d", "#e8dbb8", "#f1e9d4"],
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
            <span className="w-[10px] rounded-full bg-[#ad7e00] h-[10px]"></span>
            <span className="text-[#ad7e00]">top 25%</span>
          </span>
          <span>8235</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#c7a54d] h-[10px]"></span>
            <span className="text-[#BC8452]">25-50%</span>
          </span>
          <span>5850</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#e8dbb8] h-[10px]"></span>
            <span className="text-[#BC8452]">51-75%</span>
          </span>
          <span>3850</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="inline-flex gap-1 items-center">
            <span className="w-[10px] rounded-full bg-[#f1e9d4] h-[10px]"></span>
            <span className="text-[#BC8452]">Bottom 25%</span>
          </span>
          <span>12,525</span>
        </div>
      </div>
    </div>
  );
};

const DiscountAnalysisChart = () => {
  return (
    <Card className="bg-[#fadd91] mt-12 rounded-lg md:p-6 ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-inherit"
      >
        <div className="flex justify-between gap-8 ">
          <div>
            <Typography variant="h3" className="text-[#AD7E00]">
              Stock split by sales{" "}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#AD7E00] text-lg"
            >
              Number of pieces in stock per Sales Tier{" "}
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="md:p-6 px-2 py-0">
        <DiscountChart />
      </CardBody>
    </Card>
  );
};

export default DiscountAnalysisChart;
