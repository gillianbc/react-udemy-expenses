import React from 'react'
import Header from '../../components/Header'
import { shallow } from 'enzyme'
/*  Using ReactShallowRenderer and a snapshot
import ReactShallowRenderer from 'react-test-renderer/shallow'
it('rendered header should match the snapshot', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})*/

it('There should be 1 h1 element', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').length).toBe(1)
})

it('The h1 text should be correct', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').text()).toBe('Expensify App')
})

it('The snapshot should match', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
})



