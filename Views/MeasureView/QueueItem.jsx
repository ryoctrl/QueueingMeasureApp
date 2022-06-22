import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DateHelper from '../../helpers/DateHelper';
import { verticalScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    selectQueue,
    updateQueueHand
} from '../../stores/actions';
import MEASURE_TYPES from '../../constants/measureType';
// import { GestureHandler } from 'expo';
// const { Swipeable } = GestureHandler;
const { width } = Dimensions.get('window');
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        height: verticalScale(30),
        flexDirection: 'row',
    },
    dateBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(30)
    },
    whiteBack: {
        backgroundColor: 'white'
    },
    markerContainer: {
        flex: 1,
        justifyContent: 'center',
        height: verticalScale(30),
    },
    contentContainer: {
        flex: 19,
        flexDirection: 'row',
    },
    selecting: {
        backgroundColor: 'yellow'
    },
    manBackground: {
        backgroundColor: 'skyblue',
    },
    womanBackground: {
        backgroundColor: 'pink'
    }
});

class QueueItem extends Component {
    updateHand() {
        const { dispatch, queue } = this.props;
        dispatch(updateQueueHand(queue));
    }

    render() {
        const { queue, isHeader, dispatch, measureState } = this.props;
        const isSelecting = measureState.queue.id === queue.id;
        const isMan = queue.is_man;
        const isCacheLess = queue.is_cacheless;
        const queueingAt = queue.queueing_at ? new DateHelper(queue.queueing_at).getTime() : '-';
        const orderedAt = queue.ordered_at ? new DateHelper(queue.ordered_at).getTime() : '-';
        const paymentedAt = queue.paymented_at ? new DateHelper(queue.paymented_at).getTime() : '-';
        const servicedAt = queue.serviced_at ? new DateHelper(queue.serviced_at).getTime() : '-';
        const handedAt = queue.handed_at ? new DateHelper(queue.handed_at).getTime() : '-';
        console.log('render')

        return (
            <TouchableOpacity onPress={() => dispatch(selectQueue(queue))}>
                    <View style={[styles.container, isHeader ? styles.whiteBack : isMan ? styles.manBackground :styles.womanBackground]}>
                        {measureState.type === MEASURE_TYPES.ORDER && <View style={[styles.markerContainer, isSelecting ? styles.selecting : {}]} /> }
                        <View style={styles.contentContainer}>
                            <View style={styles.dateBox}>
                                <Text>
                                    {isHeader ? '行列参加' : queueingAt}
                                </Text>
                            </View>
                            <View style={styles.dateBox}>
                                <Text>
                                    {isHeader ? '注文開始' : orderedAt}
                                </Text>
                            </View>
                            <View style={styles.dateBox}>
                                <Text>
                                    {isHeader ? '決済開始' : paymentedAt}
                                </Text>
                            </View>
                            <View style={styles.dateBox}>
                                <Text>
                                    {isHeader ? '注文完了' : servicedAt}
                                </Text>
                            </View>
                            {measureState.type === MEASURE_TYPES.ORDER && servicedAt && handedAt === '-' &&
                            <View style={styles.dateBox}>
                                {isHeader ?
                                    <Text>受渡時刻</Text>
                                :
                                <TouchableOpacity onPress={this.updateHand.bind(this)}>
                                    <Text>
                                        受け渡し
                                    </Text>
                                </TouchableOpacity>
                                }
                            </View>
                            }
                            {handedAt !== '-' &&
                            <View style={styles.dateBox}>
                                <Text>
                                    {isHeader ? '受渡時刻' : handedAt}
                                </Text>
                            </View>
                            }
                        </View>

                        {measureState.type === MEASURE_TYPES.NONE && queue.serviced_at && 
                        (<View style={[styles.markerContainer]} > 
                            {isCacheLess ? <Text>L</Text> : <Text>C</Text>} 
                        </View>)
                        }
                    </View>
            </TouchableOpacity>
        )
    }
}

const mapToProps = datas => {
    return {
        measureState: datas.measure,
        queueState: datas.queue
    }
};
export default connect(mapToProps)(QueueItem);
