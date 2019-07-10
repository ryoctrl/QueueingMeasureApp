import React, { Component } from 'react';
import { connect } from 'react-redux';
import MEASURE_TYPE from '../../constants/measureType';
import QueueMeasureView from './QueueMeasureView';
import OrderMeasureView from './OrderMeasureView';


class MeasureView extends Component {
    render() {
        const { measure } = this.props;

        switch(measure.type) {
            case MEASURE_TYPE.ORDER:
                return <OrderMeasureView />
            case MEASURE_TYPE.QUEUE:
                return <QueueMeasureView />
            default:
                return <View><Text>計測タイプを選択してください</Text></View>
        }
    }
}

const select = datas => datas;
export default connect(select)(MeasureView);