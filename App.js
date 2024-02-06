import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from './src/screens/ProductsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ConfirmationModalScreen from './src/screens/ConfirmationModalScreen';
import LogoTitle from './src/components/LogoTitle';
import CartContext from './src/components/CartContext';
import CartButton from './src/components/CartButton';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{
            headerRight: () => <CartButton />,
          }}>
            <Stack.Screen name="Products" component={ProductsScreen} options={{ headerTitle: (props) => <LogoTitle {...props} />}}/>
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
