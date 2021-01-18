import { CLOSEPROCESSSELL, ERROR, POS_DATA, PROCESS_ITEM, PROCESS_SELL, REMOVE, RESET } from '../actions/types';
import mainReducer from './main';

describe('Main Reducer', () => {

    it('Should return default state', () => {
        const newState = mainReducer(undefined, {});
        expect(newState).toEqual({loader: true,
            pos_data: [],
            errors_res: "",
            process_items: [],
            process_sell: {},
            show_process_sell: false});
        });

    it('Should return new state if receiving type', () => {
        const products = [{
            "name": "comuter",
            "price": "130",
            "category": "computers",
            "description": "",
            "image": "comuter.jpg"
        },
        {
            "name": "tie",
            "price": "46",
            "category": "Clothing",
            "description": "fashion, tie, clothes, accessory , accessoire,…",
            "image": "tie.jpeg"
        }];
        const newState = mainReducer(undefined, {
            type: POS_DATA,
            payload: products,
            loader: false
        });
        expect(newState.pos_data).toEqual(products);
    });

    it('Should return new state if receiving type', () => {
        const products = {
            "name": "comuter",
            "price": "130",
            "category": "computers",
            "description": "",
            "image": "comuter.jpg"
        };
        const newState = mainReducer(undefined, {
            type: PROCESS_ITEM,
            payload: products,
            loader: false
        });
        expect(newState.process_items).toEqual([{
            "id":"comuter_0",
            "quantity":1,
            "total":130,
             "name": "comuter",
            "price": "130",
            "category": "computers",
            "description": "",
            "image": "comuter.jpg"
        }]);
    });

    it('Should return new state if receiving type', () => {   
        const newState = mainReducer(undefined, {
            type: RESET,
        });
        expect(newState.process_items).toEqual([]);
    }); 

});