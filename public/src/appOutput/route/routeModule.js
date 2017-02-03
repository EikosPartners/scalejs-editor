import { registerBindings, registerTemplates } from 'scalejs.mvvm';
import { registerViewModels } from 'scalejs.metadataFactory';

import routeViewModel from './routeViewModel';
import routeBindings from './routeBindings';
import routeTemplate from './route.html';


registerBindings(routeBindings);
registerTemplates(routeTemplate);

registerViewModels({
    route: routeViewModel
});
