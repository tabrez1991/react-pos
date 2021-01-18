import Main from './Main';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../utils/Tests';
import React from 'react';

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Main store={store} />).childAt(0).dive();
    return wrapper;
};

describe('Main Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {}
        wrapper = setUp(initialState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'main-container');
        expect(component.length).toBe(1);
    });
});