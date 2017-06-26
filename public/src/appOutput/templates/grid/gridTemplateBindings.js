export default {
    'grid-child-total': function () {
        const data = this.data;
        let total = 0;
        Object.keys(data).forEach((key) => {
            total += data[key];
        });
        return {
            text: `The total for this row is ${total}`
        };
    }
};
