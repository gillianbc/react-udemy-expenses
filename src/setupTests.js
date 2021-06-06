import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dotenv from 'dotenv'
configure({ adapter: new Adapter() });
Dotenv.config({ path: '.env.test'});
console.log('Setup is active')