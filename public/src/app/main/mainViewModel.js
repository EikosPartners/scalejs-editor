import { observable } from 'knockout';

export default function main() {
    const options = JSON.parse(localStorage.getItem('scalejs_editor_options') || '{}');
    const savedJson = JSON.parse(localStorage.getItem('scalejs_editor_json') ||
        '{"type": "template", "template": "text","text": "Hello World!"}');
    const savedCss = localStorage.getItem('scalejs_editor_css') || '';
    const jsonMetadata = observable(savedJson);
    const cssMetadata = observable(savedCss);
    const controls = {
        main: observable(options.main || 'split'),
        output: observable(options.output || 'desktop'),
        editors: observable(options.editors || 'split')
    };

    jsonMetadata.subscribe((data) => {
        try {
            JSON.parse(data); // check to see if it is valid JSON before we save to storage
            localStorage.setItem('scalejs_editor_json', data);
        } catch (e) {
            //possible notification
        }
    });

    cssMetadata.subscribe((styles) => {
        localStorage.setItem('scalejs_editor_css', styles);
    });

    return {
        jsonMetadata,
        cssMetadata,
        controls
    };
}