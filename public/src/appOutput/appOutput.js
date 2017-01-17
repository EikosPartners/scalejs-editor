import modules from 'app/modules';
import mainOutputModule from './mainOutput/mainOutputModule'; // always run main module after others
import './scalejs.extensions'; // setup extensions before running main module

mainOutputModule(); // start app