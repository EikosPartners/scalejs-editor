import { registerTemplates, registerBindings } from 'scalejs.mvvm';

import gridTemplateBindings from './gridTemplateBindings';
import gridTemplate from './gridTemplate.html';

registerBindings(gridTemplateBindings);
registerTemplates(gridTemplate);
