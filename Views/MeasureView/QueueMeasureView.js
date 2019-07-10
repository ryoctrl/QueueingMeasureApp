import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
    createNewQueue
} from '../../stores/actions';
import { verticalScale, scale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import QueueItem from './QueueItem';
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
        width: width * 0.5,
    },
    queueList: {
        flex: 8
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(50),
    },
    blueBack: {
        backgroundColor: 'skyblue'
    },
    pinkBack: {
        backgroundColor: 'pink'
    },
    leftRadius: {
        borderTopLeftRadius: scale(20),
        borderBottomLeftRadius: scale(20)
    },
    rightRadius: {
        borderTopRightRadius: scale(20),
        borderBottomRightRadius: scale(20)
    }
});

class QueueMeasureView extends Component {
    renderHeader = () => <QueueItem queue={{}} isHeader={true} />
    renderQueueItem = queue => <QueueItem queue={queue.item} />
    extractKey = (data, index) => String(data.id)

    render() {
        const { dispatch, measure, queue } = this.props;
        const queueList = [].concat(queue.queue).reverse();
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        列への入場を計測
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, styles.blueBack, styles.leftRadius]} onPress={() => dispatch(createNewQueue(true))}>
                        <View>
                            <Text>
                                男性
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.pinkBack, styles.rightRadius]} onPress={() => dispatch(createNewQueue(false))}>
                        <View>
                            <Text>
                                女性
                            </Text>
                        </View>
                    </TouchableOpacity>
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
export default connect(select)(QueueMeasureView);