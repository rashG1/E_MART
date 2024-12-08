import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.mjs';
import itemsRouter from './routes/users/customer/displayItems.mjs';
import orderRoute from './routes/users/customer/order.mjs';
import citiesRoute from './routes/users/customer/cities.mjs';
import routeRoute from './routes/users/customer/getroute.mjs';
import profileRouter from './routes/users/customer/profile.mjs';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/profile', profileRouter);
app.use('/api/order', orderRoute);
app.use('/api/cities', citiesRoute);
app.use('/api/getroutes', routeRoute);
app.use('/api/auth', authRoutes);
app.use('/api', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
