import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";

// Import components and pages
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Journal from "./pages/Journal/Journal";
import Shop from "./pages/Shop/Shop";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Fashion from "./pages/Fashion/Fashion";
import HomeAppliances from "./pages/HomeAppliances/HomeAppliances";
import BeautyProducts from "./pages/BeautyProducts/BeautyProducts";
import Others from "./pages/Others/Others";
import Electronics from "./pages/Electronics/Electronics";

import PublicRoute from "./components/PublicRoute";
import './App.css';
import Profile from './pages/Profile/Profile';
// Import ProtectedRoute for JWT protection
import ProtectedRoute from "./components/ProtectedRoutes";

// Layout component for common elements (Header, Footer, etc.)
const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

// Define your routes with protected paths
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<Layout />}>
          {/* Public routes for login and signup */}
          <Route
              path="/login"
              element={
                  <PublicRoute>
                      <Login />
                  </PublicRoute>
              }
          />
          <Route
              path="/signup"
              element={
                  <PublicRoute>
                      <Signup />
                  </PublicRoute>
              }
          />

          {/* Protected routes for authenticated users only */}
          <Route
              element={
                  <ProtectedRoute>
                      <Outlet />
                  </ProtectedRoute>
              }
          >
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/product/:_id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/paymentgateway" element={<Payment />} />
              <Route path="/fashion" element={<Fashion />} />
              <Route path="/home-appliances" element={<HomeAppliances />} />
              <Route path="/beauty-products" element={<BeautyProducts />} />
              <Route path="/others" element={<Others />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/profile" element={<Profile/>} />
          </Route>

          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
  )
);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;