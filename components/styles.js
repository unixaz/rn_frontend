import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    toolbar: {
        backgroundColor: '#3498db',
        color: '#fff',
        textAlign: 'center',
        padding: 25,
        fontSize: 20,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    preview: {
        backgroundColor: '#bdc3c7',
        flex: 1,
        height: 500,
    },
    input: {
        backgroundColor: '#ecf0f1',
        borderRadius: 3,
        height: 40,
        padding: 5,
        marginBottom: 10,
        flex: 1,
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 3,
        marginBottom: 10,
    },
});

export default styles;