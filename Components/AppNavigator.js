import * as React from 'react'
import {createBottomNavigator} from 'react-navigation-tabs'
import {Image} from 'react-native'
import DonateScreen from '../Screens/DonateScreen'
import BookRequestScreen from '../Screens/BookRequestScreen'

export const AppNavigator = createBottomNavigator({
    DonateScreen: {
        screen: DonateScreen,
        navigationOptions: {
            tabBarIcon: <Image style = {{width: 20}} source = {require('../assets/RequestBookImage2')}/>,
            tabBarLabel: 'Donate-books'  
        }
    },

    BookRequestScreen: {
        screen: BookRequestScreen,
        navigationOptions: {
            tabBarIcon: <Image style = {{width: 20}} source = {require('../assets/RequestBookImage')}/>,
            tabBarLabel: 'Request a book'
        }
    }
})