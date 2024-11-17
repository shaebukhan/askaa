import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import StatsCardSection from "./StatsCardSection";
import Filters from "./Filters";
import { MembersTable } from "./table/Table";
import Chart from "./charts/Chart";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <Filters />
      <StatsCardSection />
      <Chart />
      <MembersTable />
      <Footer />
    </div>
  );
};

export default Dashboard;
