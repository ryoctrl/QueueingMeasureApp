import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class MeasureView extends Component {
    render() {
        const { measure } = this.props;
        return (
            <View style={styles.container}>
                <Text>
                    {measure.type}
                </Text>
            </View>
        )
    }
};

const select = datas => datas;
export default connect(select)(MeasureView);