import React from 'react'
import Header from '../../components/Header'
import ReactShallowRenderer from 'react-test-renderer/shallow'

it('rendered header should match the snapshot', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})

