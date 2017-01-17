import { observable } from 'knockout';

export default function mainOutput() {
    const initialJsonValue = JSON.parse(localStorage.getItem('scalejs_editor_json') || {});
    const metadata = observable(initialJsonValue);
    const style = document.createElement('style');

    // add the style tag to the iframe
    document.querySelector('head').appendChild(style);

    // event listners for localstorage
    window.addEventListener('storage', () => {
        let json = localStorage.getItem('scalejs_editor_json');
        try {
            json = JSON.parse(json);
            metadata(json)
        } catch (e) {
            //possibly add warning to user about invalid json
        }
    });

    window.addEventListener('storage', () => {
        const css = localStorage.getItem('scalejs_editor_css');
        style.innerHTML = css;
    });

    return {
        metadata
    };
}