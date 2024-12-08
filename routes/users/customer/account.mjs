import express from 'express';
import pool from '../../../utilities/database/db.mjs'; // Adjust the path as necessary
import { authenticateToken } from './auth.mjs'; // Ensure you import your authentication middleware

const router = express.Router();

// Get Account Details Route
router.get('/details', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Extract user ID from the token

  try {
    // Fetch customer information
    const [customerRows] = await pool.execute('SELECT CustomerID, Name, Address, Contact FROM customer WHERE CustomerID = ?', [userId]);
    if (customerRows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customer = customerRows[0];

    // Fetch orders associated with the customer
    const [orderRows] = await pool.execute('SELECT OrderID, OrderDate FROM orders WHERE CustomerID = ?', [userId]);

    // Combine customer details with their orders
    const accountDetails = {
      CustomerID: customer.CustomerID,
      Name: customer.Name,
      Address: customer.Address,
      Contact: customer.Contact,
      Orders: orderRows, // Include the fetched orders
    };

    res.json(accountDetails); // Send the account details as the response
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ message: 'Error fetching account details', error });
  }
});

export default router;
