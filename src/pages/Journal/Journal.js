import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import "./Journal.css";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="journal-page">
      <div className="journal-content">
        <Breadcrumbs title="Journals" prevLocation={prevLocation} />
        <h1>
          <span>Fluxora</span> stands at the forefront of the e-commerce and supply chain revolution, creating a unified platform that bridges the gap between online retail and logistics management. In an era where digital transformation and customer expectations are rapidly evolving, Fluxora is designed to offer seamless shopping experiences while optimizing the intricacies of supply chain operations. By integrating advanced technologies with user-centered design, Fluxora ensures businesses can meet consumer demands efficiently and sustainably.
        </h1>
        <Link to="/shop">
          <button className="journal-button">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Journal;
