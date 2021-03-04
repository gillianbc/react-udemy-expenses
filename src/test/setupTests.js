import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
//NOT USED AT THE MO - only needed for react 16
// https://enzymejs.github.io/enzyme/
Enzyme.configure({
    adapter: new Adapter()
})