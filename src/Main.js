import './styles/index.scss';
import './js/ui';
import appConfing from './js/config.js';
import {renderBeerList} from './js/beers';
import './js/navbar';

const config = appConfing();
renderBeerList(config.limit);

console.log('hello World!');