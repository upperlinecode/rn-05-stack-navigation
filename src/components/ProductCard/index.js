import { Pressable, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onPress }) => {
    const handlePress = () => {
        onPress(product);
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.text}>{product.price}</Text>
            <Image source={product.image} style={styles.image} />
        </Pressable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        width: 150,
        backgroundColor: '#00a8ff',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        color: '#f5f6fa',
        textAlign: 'center'
    },
    text: {
        color: '#f5f6fa',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    image: {
        margin: 10,
        height: 100,
        width: 100,
    }
});
