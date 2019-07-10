import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DateHelper from '../../helpers/DateHelper';
import { verticalScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    selectQueue
} from '../../stores/actions';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        height: verticalScale(25),
        flexDirection: 'row',
    },
    dateBox: {
        flex: 1,
        alignItems: 'center'
    },
    whiteBack: {
        backgroundColor: 'white'
    },
    markerContainer: {
        flex: 1,
        height: verticalScale(25),
    },
    contentContainer: {
        flex: 19,
        flexDirection: 'row',
    },
    selecting: {
        backgroundColor: 'yellow'
    }
});

class QueueItem extends Component {
    render() {
        const { queue, isHeader, dispatch, measureState } = this.props;
        const isSelecting = measureState.queue.id === queue.id;
        const queueingAt = queue.queueing_at ? new DateHelper(queue.queueing_at).getTime() : '-';
        const orderedAt = queue.ordered_at ? new DateHelper(queue.ordered_at).getTime() : '-';
        const paymentedAt = queue.paymented_at ? new DateHelper(queue.paymented_at).getTime() : '-';
        const servicedAt = queue.serviced_at ? new DateHelper(queue.serviced_at).getTime() : '-';

        return (
            <TouchableOpacity onPress={() => dispatch(selectQueue(queue))}>
                <View style={[styles.container, isHeader ? styles.whiteBack : {}]}>
                    <View style={[styles.markerContainer, isSelecting ? styles.selecting : {}]}>
                    </View>
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
                    </View>
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