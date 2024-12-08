// profile.mjs (Backend)
import express from 'express';
import db from '../../../utilities/database/db.mjs'; // Adjust path to your db file

const router = express.Router();

// GET route to fetch user profile by customerID
router.get('/', async (req, res) => {
  const { customerID } = req.query; // Retrieve customerID from query parameters

  if (!customerID) {
    return res.status(400).json({ message: 'CustomerID is required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM customer WHERE CustomerID = ?', [customerID]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]); // Send user profile data to frontend
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

export default router;
