import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../../utils/Tests';
import LeftPannel from "./LeftPannel";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<LeftPannel store={store} />).childAt(0).dive();
    return wrapper;
};

describe('LeftPannel Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {}
        wrapper = setUp(initialState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'leftContainer');
        expect(component.length).toBe(1);
    });

    it('Should return expect value', () => {
        const component = findByTestAtrr(wrapper, 'product-price-list');
        expect(component.length).toBe(1);
    });

    it('Should have two buttons', () => {
        const component = findByTestAtrr(wrapper, 'product-buttons');
        expect(component.length).toBe(1);
    });
});