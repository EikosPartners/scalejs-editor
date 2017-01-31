import { observable } from 'knockout';
import { examples } from '../../examples/loadExamples';

export default function main() {
    const json = {
        metadata: observable().extend({ deferred: true, rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' } }),
        update: observable().extend({ notify: 'always' }),
        initial: JSON.parse(localStorage.getItem('scalejs_editor_json') ||
            '{"type": "template", "template": "text","text": "Hello World!"}')
    };
    const css = {
        metadata: observable().extend({ deffered: true, rateLimit: { method: 'notifyWhenChangesStop' } }),
        update: observable().extend({ notify: 'always' }),
        initial: localStorage.getItem('scalejs_editor_css') || ''
    };
    const controls = {
        main: observable('split'),
        output: observable('desktop'),
        editors: observable('split')
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
