import { observable } from 'knockout';
import { examples } from '../../examples/loadExamples';

function EditorObj(initialValue) {
    return Object({
        metadata: observable().extend({ deferred: true, rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' } }),
        update: observable().extend({ notify: 'always' }),
        initial: initialValue,
        control: observable().extend({ notify: 'always' })
    });
}
export default function main() {
    const json = new EditorObj(localStorage.getItem('scalejs_editor_json') ||
            '{"type": "template", "template": "text","text": "Hello World!"}');
    const css = new EditorObj(localStorage.getItem('scalejs_editor_css') || '');
    const controls = {
        main: observable('split').extend({ notify: 'always' }),
        output: observable('desktop'),
        editors: observable('split').extend({ notify: 'always' })
    };
    const selectedExample = observable('');

    selectedExample.subscribe((index) => {
        if (index) {
            json.update(examples[index].data.json || {});
            css.update(examples[index].data.css || '');
            selectedExample(0);
        }
    });

    json.metadata.subscribe((data) => {
        try {
            JSON.parse(data); // check to see if it is valid JSON before we save to storage
            localStorage.setItem('scalejs_editor_json', data);
        } catch (e) {
            // possible notification
        }
    });

    css.metadata.subscribe((styles) => {
        localStorage.setItem('scalejs_editor_css', styles);
    });

    return {
        json,
        css,
        examples,
        selectedExample,
        controls
    };
}
