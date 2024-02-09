import { useState } from 'react';
import ProductsScreen from './src/screens/ProductsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ConfirmationModalScreen from './src/screens/ConfirmationModalScreen';
import CartContext from './src/components/CartContext';

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
    </CartContext.Provider>
  );
};
