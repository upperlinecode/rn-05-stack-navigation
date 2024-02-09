import { ScrollView, View, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ProductCard from '../../components/ProductCard';
import data from '../../data';

const ProductsScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {data.map(product => (
                    <ProductCard key={uuidv4()} product={product} />
                ))}
            </View>
        </ScrollView>
    )
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
})
