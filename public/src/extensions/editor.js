import ko from 'knockout';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/mode/css';
import 'brace/theme/monokai';

/**
 * editor binding ex:
 * {
 *    storeValues: observable.
 *    initialValue: var or observable
 * }
 */
ko.bindingHandlers.editor = {
    init: (element, valueAccessor) => {
        const id = element.id;
        const editor = ace.edit(id);
        const options = valueAccessor();
        const storeValue = options.storeValue;
        const initialValue = options.initialValue && JSON.stringify(ko.unwrap(options.initialValue));

        if (!ko.isObservable(storeValue)) { // storevalue must be an observable if not error
            console.error('You provided a storeValue property but it is not an observable');
        }

        editor.getSession().setMode('ace/mode/' + (options.mode || 'json'));
        editor.setTheme('ace/theme/monokai');

        if(initialValue) { // if we have an initial value set it in editor and then update the storevalue
            editor.setValue(initialValue);
            storeValue && storeValue(initialValue);
        }

        if (storeValue) {
            editor.getSession().on('change', () => {
                storeValue(editor.getValue());
            });
        }
    }
}