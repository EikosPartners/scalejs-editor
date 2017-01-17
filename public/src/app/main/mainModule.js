import { registerBindings, registerTemplates, root, template } from 'scalejs.mvvm';
import mainViewModel from './mainViewModel';
import mainTemplate from './main.html';
import './main.scss';

registerTemplates(mainTemplate);

export default function () {
    const main = mainViewModel();

    root(template('main_template', main));
}