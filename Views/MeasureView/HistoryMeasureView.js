import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
    createNewQueue,
    updateQueueOrder,
    updateQueuePayment,
    updateQueueService
} from '../../stores/actions';
import { verticalScale, scale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import QueueItem from './QueueItem';
import { updatePayment } from '../../stores/api';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(30)
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: scale(20)

    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: scale(80)
    },
    queueList: {
        flex: 7
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
    yellowBack: {
        backgroundColor: 'lime'
    },
    greenBack: {
        backgroundColor: 'yellow'
    },
    purpleBack: {
        backgroundColor: 'pink'
    }

});

class HistoryMeasureView extends Component {
    renderHeader = () => <QueueItem queue={{}} isHeader={true} />
    renderQueueItem = queue => <QueueItem queue={queue.item} />
    extractKey = (data, index) => String(data.id)

    render() {
        const { dispatch, measure, queue } = this.props;
        const queueList = queue.queue;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        計測履歴
                    </Text>
                </View>
                <View style={styles.queueList}>
                    <FlatList data={queueList}
                        renderItem={this.renderQueueItem.bind(this)}
                        ListHeaderComponent={this.renderHeader}
                        stickyHeaderIndices={[0]}
                        keyExtractor={this.extractKey}/>
                </View>
            </View>
        )
    }
};

const select = datas => datas;
export default connect(select)(HistoryMeasureView);