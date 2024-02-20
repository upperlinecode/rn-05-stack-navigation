import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from './src/screens/ProductsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ConfirmationModalScreen from './src/screens/ConfirmationModalScreen';
import CartContext from './src/components/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.name })} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Confirmation" component={ConfirmationModalScreen} options={{ title: 'Thank you!' }} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
};
