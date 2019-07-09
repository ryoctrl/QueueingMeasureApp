import { createReducer } from 'redux-act';
import MEASURE_TYPES from '../../constants/measureType';
import {
    setMeasure
} from '../actions';

const initialState = {
    type: MEASURE_TYPES.NONE,
}

export default createReducer({
    [setMeasure]: (state, action) => {
        return {
            type: action
        }
    }
}, initialState);