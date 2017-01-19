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
