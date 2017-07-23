import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/MainScreen';


const Game = StackNavigator({
    Home: { screen: HomeScreen },
    Register: { screen: RegisterScreen },
    Main: { screen: MainScreen },
});

AppRegistry.registerComponent('Game', () => Game);