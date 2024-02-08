# React Native Stack Navigation

## LearnShop

## Objectives

- Implement Stack navigation in a React Native app.
- Use the navigation prop to pass parameters between routes.
- Add modals to the app.

## Why?

Not every mobile app will be suited for tab navigation (as discussed in the previous lab). React Navigation provides support for stack navigation. This is more akin to the global history stack in a browser (e.g., when a user navigates to a new page in a browser, that route is pushed to the top of the history stack). React Native doesn't have a history stack built in, so we must use packages like React Navigation to handle this routing.

## Setup

This is a standard React Native project. If you haven't already, follow the [Expo Go Quickstart setup guide](https://reactnative.dev/docs/environment-setup) in the React Native docs. Run `npm install` and then run `npm run ios`.

## Framing

We're building a simple shopping app that shows a products page. Clicking on a product will take users to a details page, where they'll be able to select `Add to Cart`. Selecting this button opens up a confirmation modal.

> Note: While most of our other labs use TypeScript, we chose to use JavaScript for this lab. Providing types to routes can be tricky. Because TypeScript is not the focus of this lab, we chose to omit it. Please refer to the [React Navigation type checking docs](https://reactnavigation.org/docs/typescript) for more information on using TypeScript with React Navigation.

## Exercises

### A. Implement stack navigation.

1. Import the `NavigationContainer` from `@react-navigation/native`. This is a named export.

2. It's necessary to wrap your app in the `NavigationContainer` component in order for React Navigation to work. In `App.js`, add the `NavigationContainer` within the `CartContext.Provider` component.

<details>
<summary>Click here for the coded answer</summary>

```js
import { NavigationContainer } from '@react-navigation/native';
```
```js
return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavigationContainer>
      </NavigationContainer>
    </CartContext.Provider>
);
```
</details>
<br>

3. Next, import the `createNativeStackNavigator` function from `@react-navigation/native-stack`. *Outside* of the `App` component, call this function and assign it to a variable `Stack`.

<details>
<summary>Click here for the coded answer</summary>

```js
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  // ...
}
```
</details>
<br>

4. Like the `createBottomTabNavigator` function from the previous React Navigation lab, `createNativeStackNavigator` returns an object with `Navigator` and `Screen` components. The `Navigator` component creates the stack navigator. The `Screen` component creates the individual screens in your app. You can have as many `Screen` components as needed, but only one `Navigator`, and the `Navigator` must wrap all of the `Screen` components. (Later, we'll use a new `Group` component to group our screens together.)

5. Add the `Stack.Navigator` and `Stack.Screen` components as children of the `NavigationContainer`. Add a `Stack.Screen` with a `name` prop of `Products` and pass the `ProductsScreen` component as its `component` prop. Do the same for the `DetailsScreen` and name it `Details`. [Check out the docs for more information.](https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator)

> In the previous React Navigation lab, we had to pass extra props to the components in our screens so we provided the components as child callback functions. Because we'll be passing parameters around with the `navigation` prop, we don't need any extra props! Just pass the screen components to the `component` prop--no functions needed.

<details>
<summary>Click here for the coded answer</summary>

```js
return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
);
```
</details>
<br>


6. Run the app. You should be able to see the `ProductsScreen`. But how can you get to the details? Without tab navigation, we don't have handy tabs to click through the app, meaning that we'll have to handle the navigation ourselves. We'll tackle that in the next section!

### B. Using the `navigation` prop

1. On a web app, you'd use anchor (`<a>`) tags to navigate. This tag would push the route to the top of the browser's history stack. We can use [React Navigation's navigation prop](https://reactnavigation.org/docs/navigating) to navigate to a new screen in a similar manner. By calling `navigation.navigate` and providing it with the name of a screen, you're be able to navigate to a new screen. This `navigation` prop is provided to every screen component. To use the `navigation` object in a component that isn't a screen, use the `useNavigation` hook.

2. In `ProductsScreen/index.js`, note the structure of the component. We'll need to handle navigation at some point in either the `ProductsScreen` component or the `ProductCard` component. Fortunately, we have a few options! We can call `navigation.navigate` in either the `ProductsScreen` or the `ProductCard`. Write a function in either component that calls `navigation.navigate`. In `ProductsScreen`, the `navigation` object will be passed down as a prop from the `Stack.Screen` component. In `ProductCard`, you'll need to import `{ useNavigation }` from `@react-navigation/native`. Pass the function you write to the `onPress` prop of the `Pressable` component in `ProductCard`, to be called whenever the `ProductCard` is tapped.

3. The `navigation.navigate` method takes two arguments: the name of the screen being navigated to and parameters to pass to the screen. Pass the screen name `'Details'` and the object `product` to the `navigate.navigate` function. (This will be the same `product` passed to each `ProductCard`).

4. In the app, click on a product card. You can successfully navigate to the `Details` page! But you can't see any details. In the next step, we'll learn how to pull out the route's parameters!

<details>
<summary>Click here for an example answer</summary>

```js
const ProductCard = ({ product }) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Details', product);
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.text}>{product.price}</Text>
            <Image source={product.image} style={styles.image} />
        </Pressable>
    );
};
```
</details>
<br>

### C. Using the `route` prop

1. The `route` prop contains information about the current route. Like the `navigation` prop, `route` is passed a prop to screen components. For other components, you can use the `useRoute` hook to access the `route` object. [Check out the React Navigation docs for more info.](https://reactnavigation.org/docs/route-prop)

2. In the `DetailsScreen`, destructure `route` from the props passed to the component. Assign the `product` variable the value of `route.params`.

<details>
<summary>Click here for the coded answer</summary>

```js
const DetailsScreen = ({ route }) => {
    const { cart, setCart } = useContext(CartContext);
    const product = route.params;

    const onPress = () => {
        setCart([...cart, product]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{product.name}</Text>
                <Image style={styles.image} source={product.image} />
                <Text style={styles.text}>{product.description}</Text>
                <Button color="blue" onPress={onPress} title="Add to Cart" />
            </View>
        </View>
    )
};
```
</details>
<br>

### D. Creating and navigating to modals

1. React Navigation also lets us create and navigate to modals. React Navigation handles all of the animations and opening/closing for us. All we have to do is provide the components! [See the docs for more info.](https://reactnavigation.org/docs/modal)

2. When the `Add to Cart` button in the `DetailsScreen` is clicked, we want to navigate to a confirmation modal confirming that the item was added to the user's cart. First, though, we need to add the modal. Back in `App.js`, we'll need to use the `Group` component included in `Stack` to separate out our screens. `Group` gives us a little more granular control. Wrap the `Stack.Screen` components for `Products` and `Details` in a `<Stack.Group>` component.

3. Create a separate `Stack.Group` component. `Stack.Group` can take a `screenOptions` prop, allowing for a wide range of customization. For this particular `Stack.Group`, pass `screenOptions` an object with a key of `presentation` and a value of `'modal'`. This tells React Navigation that the screens inside this group should present as modals.

4. Import the `ConfirmationModalScreen` from `./src/screens/ConfirmationModalScreen`. Within your second `Stack.Group`, add a `Stack.Screen` named `Confirmation` and give it `ConfirmationModalScreen` as its `component` prop. 

5. In the `DetailsScreen` component, destructure the `{ navigation }` prop. In the existing `onPress` function, call, navigate to the `Confirmation` screen and pass it the `product`.

<details>
<summary>Click here for the coded answer</summary>

```js
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Confirmation" component={ConfirmationModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
```
```js
const DetailsScreen = ({ navigation }) => {
    const { cart, setCart } = useContext(CartContext);
    const product = route.params;

    const onPress = () => {
        setCart([...cart, product]);
        navigation.navigate('Confirmation', product);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{product.name}</Text>
                <Image style={styles.image} source={product.image} />
                <Text style={styles.text}>{product.description}</Text>
                <Button color="blue" onPress={onPress} title="Add to Cart" />
            </View>
        </View>
    )
};
```
</details>
<br>

### E. Customizing the header

1. By default, the header will display the screen's name--a little boring and uninformative for the user. Fortunately, the header can be customized at the `Navigator`, `Group`, or `Screen` levels, with each level offering more granularity. Right now, let's customize the `Details` and `Confirmation` screen. [Check out the docs for more info.](https://reactnavigation.org/docs/headers)

2. The `options` prop can either take an object or a function that receives the `route` as its argument and returns an object. In the `Confirmation` modal, provide an object with a `title` key and a value of `Thank you!`.

3. In the `Details` screen, pass a function to the `options` prop. This function will receive an object with the `route` as its argument. Return an object with the key `title` and the product's name. (Remember what parameters we're passing to the `Details` screen!)

<details>
<summary>Click here for the coded answer</summary>

```javascript
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
```
</details>
<br>

### E. Extra Challenges

**Mild**
- The header's back button can be customized as well! [Check out the docs for more info.](https://reactnavigation.org/docs/native-stack-navigator#headerbacktitle) Try customizing the back button.

**Medium**
- Using the `headerTitle` option on a screen lets us use a custom component as our title. Create a component called `LogoTitle`. Display a shopping cart icon and the text `LearnShop` as the title for the `Products` screen. (For the shopping cart icon, you can use Ionicons: `<Ionicons name="cart-sharp" size={25} color="#192a56" />`. Ionicons is imported from Expo: `import Ionicons from '@expo/vector-icons/Ionicons';`.) [Check out the docs for more info.](https://reactnavigation.org/docs/native-stack-navigator#headertitle)

**Spicy**
- We can add a button to the right of the header! We've provided a `CartContext` for you to use. When the `Add to Cart` button in the `DetailsScreen` is pressed, the product is added to the cart. Use the `CartContext` in a new screen called `Cart` and add a button with a shopping bag icon as the right header button. When this button is pressed, display the `Cart` modal. [Check out the docs for more info on adding a right header button.](https://reactnavigation.org/docs/header-buttons) You can use Ionicons for the icon: `<Ionicons name="bag-handle-sharp" size={25} color="#192a56" />`. Ionicons is imported from Expo: `import Ionicons from '@expo/vector-icons/Ionicons';`.
