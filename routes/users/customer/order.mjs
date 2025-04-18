import express from 'express';
import db from '../../../utilities/database/db.mjs';

const router = express.Router();
// POST /api/order
router.post('/', async (req, res) => {
  const { customerID, orderDate, routeID, value, totalVolume } = req.body;
  console.log("Received data999999999999999999:", req.body); // Log the received data

  if (!customerID || !orderDate || !routeID || !value || !totalVolume) {

    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO \`order\` (CustomerID, Value, OrderDate, DeliveryDate, RouteID, TotalVolume)
      VALUES (?, ?, ?, NULL, ?, ?)
    `;

    const [result] = await db.query(query, [
      customerID,
      value,
      orderDate,
      routeID,
      totalVolume,
    ]);

    res.status(200).json({
      message: "Order placed successfully",
      orderID: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting order:", err);
    res.status(500).json({ error: "Failed to insert order" });
  }
});

export default router;
