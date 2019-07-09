import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import MEASURE_TYPE from '../constants/measureType';
import { setMeasure } from '../stores/actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: scale(20)
    },
    buttons: {
        marginTop: scale(30),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    circle: {
        margin: scale(20),
        width: scale(100),
        height: scale(100),
        borderRadius: scale(100) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pink: {
        backgroundColor:  'pink'
    },
    lime: {
        backgroundColor:  'lime'
    },
    buttonText: {
        fontSize: scale(20)
    }
});

class MainView extends Component {
    beginMeasure(measureType) {
        const { dispatch, navigation } = this.props;
        dispatch(setMeasure(measureType));
        navigation.navigate('Measure');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        計測担当を選択
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.beginMeasure(MEASURE_TYPE.QUEUE)}>
                        <View style={[styles.circle, styles.pink]}>
                            <Text style={styles.buttonText}>
                                行列
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.beginMeasure(MEASURE_TYPE.ORDER)}>
                        <View style={[styles.circle, styles.lime]}>
                            <Text style={styles.buttonText}>
                                注文決済
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const select = datas => datas;
export default connect(select)(MainView);