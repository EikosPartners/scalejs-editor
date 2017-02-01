import { unwrap } from 'knockout';

export default {
    'main-split-actions': function (ctx, args) {
        const value = args[1];
        const section = args[2] || 'main';
        return {
            click: () => {
                this.controls[section](value === 'split' ? value : ['collapse', value]);
            }
        };
    },
    'main-editor-actions': function (ctx, args) {
        const editor = args[1] || 'json';
        const action = args[2] || 'zoomIn';

        return {
            click: () => {
                this[editor].control(action);
            }
        };
    },
    'main-output-view': function (ctx, args) {
        const value = args[1];
        return {
            click: () => {
                if (value === unwrap(this.controls.output)) { return; }
                this.controls.output(value);
            }
        };
    },
    'main-iframe-styles': function () {
        return {
            css: this.controls.output
        };
    }
};
