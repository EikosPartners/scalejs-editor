import { observable } from 'knockout';

export default function main() {
    const jsonMetadata = observable({
        "type": "template",
        "template": "text",
        "text": "Hello World!"
    });
    const cssMetadata = observable();

    jsonMetadata.subscribe((data) => {
        localStorage.setItem('scalejs_editor_json', data);
    });

    cssMetadata.subscribe((styles) => {
        localStorage.setItem('scalejs_editor_css', styles);
    });

    return {
        jsonMetadata,
        cssMetadata
    };
}