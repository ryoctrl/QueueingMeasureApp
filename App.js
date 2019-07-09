import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainView from './Views/MainView';
import MeasureView from './Views/MeasureView';

const MainNavigator = createStackNavigator({
    Top: { screen: MainView },
    Measure: { screen: MeasureView }
}, {
    initialRouteName: 'Top',
    headerMode: 'none'
});

const Navigator = createAppContainer(MainNavigator);

export default class App extends Component {
    render() {
        return ( 
            <Navigator / >
        )
    }
};