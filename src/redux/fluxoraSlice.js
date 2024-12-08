import { createSlice } from '@reduxjs/toolkit';

const orebiSlice = createSlice({
  name: 'FLUXORA',
  initialState: {
    products: [], // Array of cart items
    customerID: 1, // Default customer ID
    routeID: 1, // Default route ID
    totalValue: 0, // Total value of the order
    totalVolume: 0, // Total volume (quantity of products)
    orderDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity if item already exists
      } else {
        state.products.push({ id, name, price, quantity }); // Store new product
      }
      // Update totalVolume and totalValue
      state.totalVolume += quantity; // Increment total volume
      state.totalValue += price * quantity; // Update total value
    },
    resetCart: (state) => {
      state.products = []; // Reset cart
      state.totalValue = 0; // Reset total value
      state.totalVolume = 0; // Reset total volume
    },
    deleteItem: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
        // Adjust totalValue and totalVolume
        state.totalValue -= item.price * item.quantity; // Reduce total value
        state.totalVolume -= item.quantity; // Reduce total volume
      }
      state.products = state.products.filter(item => item.id !== id); // Remove item from cart
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrease quantity
        // Update totalVolume and totalValue
        state.totalVolume -= 1; // Decrement total volume
        state.totalValue -= item.price; // Decrement total value
      } else if (item) {
        state.totalValue -= item.price * item.quantity; // Adjust total value
        state.totalVolume -= item.quantity; // Adjust total volume
        state.products = state.products.filter(item => item.id !== id); // Remove item
      }
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
        item.quantity += 1; // Increase quantity
        // Update totalVolume and totalValue
        state.totalVolume += 1; // Increment total volume
        state.totalValue += item.price; // Increment total value
      }
    },
    setRouteID: (state, action) => {
      state.routeID = action.payload; // Set the selected route ID
    },
    // New action to prepare the order submission format
    prepareOrder: (state) => {
      return {
        customerID: state.customerID,
        value: state.totalValue,
        orderDate: state.orderDate,
        routeID: state.routeID,
        totalVolume: state.totalVolume,
        products: state.products.map(product => ({
          ProductID: product.id,
          Amount: product.quantity,
        })),
      };
    },
  },
});

// Export actions for use in components
export const {
  addToCart,
  resetCart,
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
  setRouteID,
  prepareOrder,
} = orebiSlice.actions;

// Export the reducer
export default orebiSlice.reducer;
