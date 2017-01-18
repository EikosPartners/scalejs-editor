import { observable } from 'knockout';

export default function mainOutput() {
    const initialJsonValue = JSON.parse(localStorage.getItem('scalejs_editor_json') || {});
    const metadata = observable(initialJsonValue);
    const style = document.createElement('style');


    // add the style tag to the iframe and clear ut the localstorage
    document.querySelector('head').appendChild(style);
    localStorage.setItem('scalejs_editor_css', '');

    // event listner for localstorage
    window.addEventListener('storage', () => {
        const css = localStorage.getItem('scalejs_editor_css');
        let json = localStorage.getItem('scalejs_editor_json');

        // update json if it has changed
        if (json !== JSON.stringify(metadata())) {
            try {
                json = JSON.parse(json);
                metadata(json)
            } catch (e) {
                //possibly add warning to user about invalid json
            }
        }

        // update css if it has changed
        if (css && css !== style.innerHTML) {
            style.innerHTML = css;
        }
    });

    return {
        metadata
    };
}