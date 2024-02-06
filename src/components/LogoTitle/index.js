import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const LogoTitle = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="cart-sharp" size={25} color="#192a56" />
            <Text style={styles.title}>LearnShop</Text>
        </View>
    );
}

export default LogoTitle;

const styles = StyleSheet.create({
    container: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#192a56",
    }
});
