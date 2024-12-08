import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import "./About.css";

// Import images directly for use in JSX
import Service1 from '../../assets/images/about/a1.jpg';
import Service2 from '../../assets/images/about/a2.jpg';
import Service3 from '../../assets/images/about/a3.jpg';
import Service4 from '../../assets/images/about/a4.jpg';
const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state?.data) setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="about-container">
      <Breadcrumbs title="About Fluxora" prevLocation={prevLocation} />
      <section className="intro-section">
        <div className="intro-text">
          <h1 className="title">
            <span className="highlight">Fluxora</span> - Redefining Supply Chain and E-commerce
          </h1>
          <p className="description">
            At Fluxora, we blend innovation and experience to streamline supply chains
            and enhance e-commerce journeys. Our platform integrates logistics, 
            inventory management, and customer satisfaction, making us a global leader.
          </p>
        </div>
        <img src={Service1} alt="Fluxora Overview" className="intro-image" />
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services">
          <div className="service-card">
            <img src={Service4} alt="Comprehensive Supply Chain" />
            <h3>Comprehensive Supply Chain</h3>
            <p>Optimize every step from sourcing to delivery, ensuring efficiency and accuracy.</p>
          </div>
          <div className="service-card">
            <img src={Service2} alt="E-commerce Integration" />
            <h3>E-commerce Integration</h3>
            <p>Seamlessly integrate your e-commerce with our powerful backend.</p>
          </div>
          <div className="service-card">
            <img src={Service3} alt="Real-time Tracking" />
            <h3>Real-time Tracking</h3>
            <p>Track orders and inventory in real-time to stay ahead of demand.</p>
          </div>
        </div>
      </section>

      <section className="qualities-section">
        <h2>Our Qualities</h2>
        <ul className="qualities-list">
          <li>Reliability and Transparency</li>
          <li>Data-driven Insights</li>
          <li>Efficient Customer Support</li>
          <li>Global Reach and Expertise</li>
        </ul>
      </section>

      <section className="experience-section">
        <h2>Our Experience</h2>
        <p>
          With years of expertise in supply chain management and e-commerce, Fluxora brings
          trusted solutions to meet the diverse needs of businesses worldwide.
        </p>
      </section>

      <Link to="/shop" className="continue-link">
        <button className="continue-button">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default About;
