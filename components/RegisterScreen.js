import React from 'react';
import {
    Alert,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import styles from './styles';

const endpoint = 'http://192.168.0.57/rest_api/public/api/user'; //https://my-bookmarks-api.herokuapp.com/api/bookmarks';
const ACCESS_TOKEN = 'access_token';

class RegisterScreen extends React.Component {
    state = {
        result: [],
        name: '',
        password: '',
        repeatPassword: '',
    };

   /* onLoad = async () => {
        this.setState({ result: 'Loading, please wait...' });

        const response = await fetch(endpoint, {
            method: 'GET',
        });

        const result = await response.text();

        this.setState({ result });
    };*/

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            console.log("Token was stored successfull ");
        } catch(error) {
            console.log("Something went wrong");
        }
    }

    onSave = async () => {
        const { name, password, repeatPassword } = this.state;
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
                repeatPassword,
            }),
        });
        const result = await response.json();

        if (result.respStatus === 'ok')
        {
            this.storeToken(result.accessToken);
            navigate('Home');
            Alert.alert('Sucess', 'User successfully created');
        } else {
            const formErrors = result.messages;
            this.setState({ result: formErrors });
        }

    };

    onNameChange = (name) => this.setState({ name });
    onPasswordChange = (password) => this.setState({ password });
    onRepeatPasswordChange = (repeatPassword) => this.setState({ repeatPassword });

    static navigationOptions = {
        title: 'Register',
    };

    render() {
        const { result, name, password, repeatPassword } = this.state;

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
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onRepeatPasswordChange}
                        value={repeatPassword}
                        placeholder="Repeat Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={this.onSave} style={styles.btn}>
                        <Text>Register</Text>
                    </TouchableOpacity>

                    <Errors messages={this.state.result}/>

                   {/* <TextInput
                        style={styles.preview}
                        value={result}
                        placeholder="Result..."
                        editable={false}
                        multiline
                    />*/}
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

export default RegisterScreen;