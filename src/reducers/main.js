import { CLOSEPROCESSSELL, ERROR, POS_DATA, PROCESS_ITEM, PROCESS_SELL, REMOVE, RESET } from '../actions/types';

const initialState = {
    loader: true,
    pos_data: [],
    errors_res: "",
    process_items: [],
    process_sell: {},
    show_process_sell: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POS_DATA:
            return {
                ...state,
                pos_data: payload,
                loader: false
            }
        case ERROR:
            return {
                ...state,
                errors_res: payload,
                loader: false
            }
        case PROCESS_ITEM:
            let _process_items = [...state.process_items];
            let flag = 0;
            _process_items.forEach(element => {
                if (element.name == payload.name) {
                    element.quantity = element.quantity + 1;
                    element.total = payload.price * element.quantity;
                    flag = 1;
                }
            });
            if (flag != 1) {
                payload["id"] = payload.name + "_" + _process_items.length
                payload["quantity"] = 1;
                payload["total"] = payload.price * 1;
                _process_items.push(payload);
            }
            return {
                ...state,
                process_items: _process_items,
                loader: false
            }
        case REMOVE:
            let _process_remove = [...state.process_items];;
            let new_product = [];
            _process_remove.forEach(element => {
                if (element.id != payload) {
                    new_product.push(element)
                }
            });
            return {
                ...state,
                process_items: new_product,
                loader: false
            }
        case PROCESS_SELL:
            return {
                ...state,
                process_sell: payload,
                show_process_sell: true
            }

        case CLOSEPROCESSSELL:
            return {
                ...state,
                show_process_sell: false
            }
        case RESET:
            return {
                ...state,
                process_items: []
            }
        default:
            return state;
    }
}