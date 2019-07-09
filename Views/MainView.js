import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';

const types = {
    QUEUE: 'QUEUE',
    ORDER: 'ORDER',
}

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
        const { navigate } = this.props.navigation;
        navigate('Measure');
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
                    <TouchableOpacity onPress={() => this.beginMeasure(types.QUEUE)}>
                        <View style={[styles.circle, styles.pink]}>
                            <Text style={styles.buttonText}>
                                行列
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.beginMeasure(types.ORDER)}>
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

export default MainView;