import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import WelcomeScreen from './Screens/WelcomeScreen'
import AppNavigator from './Components/AppNavigator'



export default function App() {
  return (
    <View>
        <AppContainer/>
    </View>
  );
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen
  },

  Navigation: {
    screen: AppNavigator
  }  
})

const AppContainer =  createAppContainer(SwitchNavigator)