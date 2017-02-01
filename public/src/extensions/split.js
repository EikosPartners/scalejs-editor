import ko from 'knockout';
import split from 'split.js';
import { merge } from 'scalejs';

ko.bindingHandlers.split = {
    init: (element, valueAccessor) => {
        const options = valueAccessor();
        const splits = options.splits;
        const splitDefaultSizes = options.defaultSplits ||
            Array(options.splits.length).fill(100 / options.splits.length);
        let instance;

        if (options.flex) {
            instance = split(splits, merge({
                elementStyle: (dim, size, gutterSize) => {
                    return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px' }
                },
                gutterStyle: (dim, gutterSize) => {
                    return { 'flex-basis': gutterSize + 'px' }
                }
            }, options));
        } else {
            instance = split(splits, options);
        }

        if (options.control) {
            options.control.subscribe((value) => {
                const action = Array.isArray(value) ? value[0] : value;
                const controlOption = Array.isArray(value) && value[1] ? value[1] : undefined;

                switch (action) {
                    case 'split':
                        instance.setSizes(controlOption || splitDefaultSizes);
                        break;
                    case 'collapse':
                        instance.collapse(Number(controlOption) || 0);
                        break;
                    default:
                        console.log('split binging--> invalid action type requested');
                }
            });
        }
    }
}