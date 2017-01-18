import { observable } from 'knockout';

export default function main() {
    const options = JSON.parse(localStorage.getItem('scalejs_editor_options') || '{}');
    const savedJson = JSON.parse(localStorage.getItem('scalejs_editor_json') ||
        '{"type": "template", "template": "text","text": "Hello World!"}');
    const jsonMetadata = observable(savedJson);
    const cssMetadata = observable();
    const controls = {
        main: observable(options.main || 'split'),
        output: observable(options.output || 'desktop'),
        editors: observable(options.editors || 'split')
    };

    jsonMetadata.subscribe((data) => {
        localStorage.setItem('scalejs_editor_json', data);
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