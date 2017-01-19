import { observable } from 'knockout';

export default function mainOutput() {
    const initialJsonValue = JSON.parse(localStorage.getItem('scalejs_editor_json') || {});
    const initialCssValue = localStorage.getItem('scalejs_editor_css' || '');
    const metadata = observable(initialJsonValue);
    const style = document.createElement('style');

    // apply saved styles to the window
    style.innerHTML = initialCssValue;

    // add the style tag to the iframe and clear ut the localstorage
    document.querySelector('head').appendChild(style);

    // event listner for localstorage
    window.addEventListener('storage', (e) => {
        const key = e.key;
        const data = e.newValue;

        // update json if it has changed
        if (key === 'scalejs_editor_json') {
            try { // this may not be necessary as we check before we save to localhost
                metadata(JSON.parse(data));
            } catch (e) {
                // possibly add warning to user about invalid json
            }
        }

        // update css if it has changed
        if (key === 'scalejs_editor_css') {
            style.innerHTML = data;
        }
    });

    return {
        metadata
    };
}
