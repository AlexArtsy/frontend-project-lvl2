import stylish from './stylish.js';
import plain from './plain.js';

const formatData = (data, style) => (style === 'plain' ? plain(data) : stylish(data));
export default formatData;
