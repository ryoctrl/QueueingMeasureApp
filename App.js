import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import  configureStore from './stores/store';
import { YellowBox } from 'react-native'

import MainView from './views/MainView';
import MeasureView from './views/MeasureView/MeasureView';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

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
            <Provider store={configureStore()}>
                <Navigator / >
            </Provider>
        )
    }
};