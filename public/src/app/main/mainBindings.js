export default {
    'main-split-actions': function(ctx, args) {
        const value = args[1];
        return {
            click: () => {
                this.controls.main(value === 'split' ? value : ['collapse', value]);
            }
        }
    }
}