import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import styles from './styles';

const ACCESS_TOKEN = 'access_token';


class HomeScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            accessToken: '',
        }
    }

    static navigationOptions = {
        title: 'Main',
    };

    componentWillMount() {
        this.getToken();
    };

    async getToken() {
        const { navigate } = this.props.navigation;
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if(!accessToken) {
                navigate('Home');
            } else {
                this.setState({accessToken: accessToken})
            }
        } catch(error) {
            console.log("Something went wrong on MainScreen getToken");
            navigate('Home');
        }
    };

    async deleteToken() {
        const { navigate } = this.props.navigation;
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            navigate('Home');
        } catch(error) {
            console.log("Something went wrong on MainScreen deleteToken");
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <TouchableOpacity onPress={this.onLogin} style={styles.btn}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Register')} style={styles.btn}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.deleteToken} style={styles.btn}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default HomeScreen;