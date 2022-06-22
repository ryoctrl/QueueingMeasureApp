import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import {
    createNewQueue,
    updateQueueOrder,
    updateQueuePayment,
    updateQueueService
} from '../../stores/actions';

const styles = StyleSheet.create({
    multiButton: {
        flexDirection: 'row'

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(75),
        height: scale(75),
        borderRadius: scale(75) / 2,
        marginLeft: scale(10),
        marginRight: scale(10)
    },
    buttonContent: {
        alignItems: 'center'

    },
    yellowBack: {
        backgroundColor: 'lime'
    },
    greenBack: {
        backgroundColor: 'yellow'
    },
    purpleBack: {
        backgroundColor: 'pink'
    }
});;

class QueueAction extends Component {
    render() {
        const { queue, dispatch } = this.props;

        if(queue.id === -1) return <Text>Queueを選択してください</Text>

        if(!queue.ordered_at) {
            return (
                <TouchableOpacity style={[styles.button, styles.yellowBack]} onPress={() => dispatch(updateQueueOrder())}>
                    <View style={styles.buttonContent}>
                        <Text>
                            注文
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

        if(!queue.paymented_at) {
            return (
                <TouchableOpacity style={[styles.button, styles.greenBack]} onPress={() => dispatch(updateQueuePayment())}>
                    <View style={styles.buttonContent}>
                        <Text>
                            決済
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return(
            <View style={styles.multiButton}>
                <TouchableOpacity style={[styles.button, styles.purpleBack]} onPress={() => dispatch(updateQueueService(false))}>
                    <View style={styles.buttonContent}>
                        <Text>
                            完了
                        </Text>
                        <Text>
                            Cache
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.purpleBack]} onPress={() => dispatch(updateQueueService(true))}>
                    <View style={styles.buttonContent}>
                        <Text>
                            完了
                        </Text>
                        <Text>
                            CacheLess
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default QueueAction;