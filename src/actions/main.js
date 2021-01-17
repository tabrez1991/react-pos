import { POS_DATA, ERROR, PROCESS_ITEM, REMOVE, PROCESS_SELL, CLOSEPROCESSSELL, RESET } from './types';
import pos_data from "../utils/pos.product.json";

export const getPosData = () => async dispatch => {
    try {
        const res = pos_data;
        dispatch({
            type: POS_DATA,
            payload: res
        })
    } catch (err) {
        console.error(err)
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}

export const addItem = (data) => async dispatch => {
    try {
        const res = data;
        dispatch({
            type: PROCESS_ITEM,
            payload: res
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}


export const removeItem = (id) => async dispatch => {
    try {
        const res = id;
        dispatch({
            type: REMOVE,
            payload: res
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}

export const processSell = (data) => async dispatch => {
    try {
        dispatch({
            type: PROCESS_SELL,
            payload: data
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}

export const closeProcessSell = () => async dispatch => {
    try {
        dispatch({
            type: CLOSEPROCESSSELL,
            payload: false
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}

export const resetItem = () => async dispatch => {
    try {
        dispatch({
            type: RESET,
            payload: false
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: ERROR,
            payload: err
        })
    }
}