import elementResizeEvent from 'element-resize-event';
import ko from 'knockout';
import ace from 'brace';
import 'brace/theme/monokai';
import 'brace/mode/json';
import 'brace/mode/css';

/**
 * editor binding ex:
 *  {
 *      storeValues: observable.
 *      initialValue: var or observable,
 *      updateValue: observable
 *      control: observable
 *  }
 */
ko.bindingHandlers.editor = {
    init: (element, valueAccessor) => {
        const id = element.id;
        const editor = ace.edit(id);
        const options = valueAccessor();
        const storeValue = options.storeValue;
        const updateValue = options.updateValue;
        let initialValue = options.initialValue && ko.unwrap(options.initialValue);

        if (!ko.isObservable(storeValue)) { // storevalue must be an observable if not error
            console.error('You provided a storeValue property but it is not an observable');
        }

        editor.getSession().setMode(`ace/mode/${(options.mode || 'json')}`);
        editor.setTheme('ace/theme/monokai');

        // If store value is provided setup the change event listner
        if (storeValue) {
            editor.getSession().on('change', () => {
                storeValue(editor.getValue());
            });
        }

        // if update value is provided setup subscription to update editor
        if (updateValue) {
            updateValue.subscribe((update) => {
                editor.setValue('');
                editor.insert(update);
            });
        }

        // if we have an initial value set it in editor
        if (initialValue) {
            // if it is already a string do not stringify
            if (typeof initialValue !== 'string') { initialValue = JSON.stringify(initialValue, null, 4); }
            editor.insert(initialValue);
        }

        if (options.control) {
            options.control.subscribe((action) => {
                switch (action) {
                    case 'zoomIn':
                        editor.setOption('fontSize', Math.min(editor.getOption('fontSize') + 2, 72));
                        break;
                    case 'zoomOut':
                        editor.setOption('fontSize', Math.max(editor.getOption('fontSize') - 2, 2));
                        break;
                    case 'zoomDefault':
                        editor.setOption('fontSize', 12);
                        break;
                    default:
                        break;
                }
            });
        }

        // if the editor is element is resized, resize the editor
        elementResizeEvent(element, () => {
            editor.resize();
        });
    }
};
