import 'babel-polyfill';
import mainModule from './main/mainModule'; // always run main module after others
import './scalejs.extensions'; // setup extensions before running main module

// import css
import '../../sass/header.scss';
import '../../sass/gutters.scss';
import '../../sass/buttons.scss';
import '../../sass/editor-controls.scss';

mainModule(); // start app
