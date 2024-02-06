import { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import CartContext from '../../components/CartContext';

const DetailsScreen = ({ navigation, route }) => {
    const { cart, setCart } = useContext(CartContext);
    const product = route.params;

    const onPress = () => {
        setCart([...cart, product]);
        navigation.navigate('Confirmation', { name: product.name })
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

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: '80%',
        width: '90%',
        padding: 20,
        backgroundColor: '#00a8ff',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    title: {
        textAlign: 'center',
        color: '#f5f6fa',
        fontSize: 25,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200
    },
    text: {
        textAlign: 'center',
        color: '#f5f6fa',
        fontSize: 16,
        fontStyle: 'italic',
    }
})
