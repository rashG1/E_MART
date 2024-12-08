import React from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";
import './stylebars.css'; // Import the main CSS file

const Price = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const priceList = [
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 49.99,
      path: "/price-range/0-49.99",
    },
    {
      _id: 951,
      priceOne: 50.0,
      priceTwo: 99.99,
      path: "/price-range/50-99.99",
    },
    {
      _id: 952,
      priceOne: 100.0,
      priceTwo: 199.99,
      path: "/price-range/100-199.99",
    },
    {
      _id: 953,
      priceOne: 200.0,
      priceTwo: 399.99,
      path: "/price-range/200-399.99",
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
      path: "/price-range/400-599.99",
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
      path: "/price-range/600-1000",
    },
  ];

  return (
    <div className="container">
      <NavTitle title="Shop by Price" icons={false} />
      <div>
        <ul className="list">
          {priceList.map(({ _id, priceOne, priceTwo, path }) => (
            <li key={_id} className="item">
              <button
                onClick={() => navigate(path)}
                className="button"
              >
                ${priceOne.toFixed(2)} - ${priceTwo.toFixed(2)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
