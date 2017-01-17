import ko from 'knockout';
import split from 'split.js';
import { merge } from 'scalejs';

ko.bindingHandlers.split = {
    init: (element, valueAccessor) => {
        const options = valueAccessor()
        const splits = options.splits;

        if (options.flex) {
            split(splits, merge({
                elementStyle: (dim, size, gutterSize) => {
                    return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px' }
                },
                gutterStyle: (dim, gutterSize) => {
                    return { 'flex-basis': gutterSize + 'px' }
                }
            }, options));
        } else {
            split(splits, options);
        }
    }
}