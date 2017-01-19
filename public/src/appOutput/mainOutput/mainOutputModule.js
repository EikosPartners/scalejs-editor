import { registerTemplates, root, template } from 'scalejs.mvvm';

import mainOutputViewModel from './mainOutputViewModel';
import mainOutputTemplate from './mainOutput.html';

registerTemplates(mainOutputTemplate);

export default function () {
    const mainOutput = mainOutputViewModel();

    root(template('mainOutput_template', mainOutput));
}
