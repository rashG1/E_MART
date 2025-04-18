import express from 'express';
import db from '../../../utilities/database/db.mjs';

const router = express.Router();

// Route to get routes based on city directly using a SQL query
router.get('/', async (req, res) => {
    const { city } = req.query;

    // Check if city parameter is provided
    if (!city) {
        return res.status(400).json({ message: 'City parameter is required.' });
    }

    try {
        // Direct SQL query to fetch routes based on the city
        const query = `
            SELECT Route.RouteID, Route.Time_duration, Route.Description, Route.StoreID, Route.Distance
            FROM Route
            JOIN Store ON Route.StoreID = Store.StoreID
            WHERE Store.City = ?
        `;
        const [routes] = await db.query(query, [city]);

        // Send response with fetched routes
        res.json(routes); // routes contains the result set
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ message: 'Failed to fetch routes.' });
    }
});

export default router;
