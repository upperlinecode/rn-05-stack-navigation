import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmationModalScreen = () => {
    return (
        <View style={styles.content}>
            <Text style={styles.text}>Add your text here!</Text>
            <Button color="blue" title="Go back" />
        </View>
    );
};

export default ConfirmationModalScreen;

const styles = StyleSheet.create({
    content: {
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: '#487eb0',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    text: {
        fontSize: 30,
        color: '#f5f6fa',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
