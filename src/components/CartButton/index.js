import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CartButton = () => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Cart');
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Ionicons name="bag-handle-sharp" size={25} color="#192a56" />
        </TouchableOpacity>
    );
};

export default CartButton;

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: 25
    }
});
