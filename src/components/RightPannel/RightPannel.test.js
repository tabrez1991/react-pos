import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../../utils/Tests';
import RightPannel from "./RightPannel";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<RightPannel store={store} />).childAt(0).dive();
    return wrapper;
};

describe('RightPannel Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {
            loader:true,
            pos_data:[{"name": "comuter", "price": "130", "description": "","image": "comuter.jpg"},{"name": "comuter", "price": "130", "description": "","image": "comuter.jpg"}]
        }
        wrapper = setUp(initialState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'product_list');
        expect(component.length).toBe(1);
    });

     it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});