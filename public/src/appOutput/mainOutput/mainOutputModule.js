import { registerBindings, registerTemplates, root, template } from 'scalejs.mvvm';

import mainOutputViewModel from './mainOutputViewModel';
import mainOutputTemplate from './mainOutput.html';

registerTemplates(mainOutputTemplate);

export default function () {
    let mainOutput = mainOutputViewModel();

    root(template('mainOutput_template', mainOutput));
}