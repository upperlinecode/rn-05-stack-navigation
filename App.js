import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProductsScreen from './src/screens/ProductsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ConfirmationModalScreen from './src/screens/ConfirmationModalScreen';
import CartContext from './src/components/CartContext';

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CartContext.Provider value={{ cart, setCart }}>
      </CartContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
