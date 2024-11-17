import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Articles from "./pages/Articles";
import GeoView from "./pages/GeoView";
import OrderDetails from "./pages/OrderDetails";


const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/map" element={<GeoView />} />
        <Route path="/order/:id" element={<OrderDetails />} />

      </Routes>
    </Router>
  );
};

export default App;
