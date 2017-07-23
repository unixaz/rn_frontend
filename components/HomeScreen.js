import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    AsyncStorage,
} from 'react-native';
import styles from './styles';

const endpoint = 'http://192.168.0.57/rest_api/public/api/login';
const ACCESS_TOKEN = 'access_token';

class HomeScreen extends React.Component {
    constructor(){
        super();

        this.state = {
            result: [],
            name: '',
            password: '',
        }
    };

    static navigationOptions = {
        title: 'Welcome',
    };

    onNameChange = (name) => this.setState({ name });
    onPasswordChange = (password) => this.setState({ password });

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            console.log("Token was stored successfull ");
        } catch(error) {
            console.log("Something went wrong on HomeScreen storeToken method");
        }
    }

    onLogin = async () => {
        const { name, password } = this.state;
        const { navigate } = this.props.navigation;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                name,
                password,
            }),
        });
        const result = await response.json();

        if (result.respStatus === 'ok')
        {
            const accessToken = result.accessToken
            console.log('onLogin: ' + accessToken);
            this.storeToken(accessToken);
            navigate('Main');
        } else {
            const formErrors = result.messages;
            this.setState({ result: formErrors });
        }

    };

    render() {
        const { navigate } = this.props.navigation;
        const { name, password, result } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onNameChange}
                        value={name}
                        placeholder="Username"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onPasswordChange}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={this.onLogin} style={styles.btn}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Register')} style={styles.btn}>
                        <Text>Register</Text>
                    </TouchableOpacity>

                    <Errors messages={this.state.result}/>

                </ScrollView>
            </View>
        );
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.messages.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
};

export default HomeScreen;