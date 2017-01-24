import 'babel-polyfill';
import 'appOutput/modules';
import mainOutputModule from './mainOutput/mainOutputModule'; // always run main module after others

mainOutputModule(); // start app
