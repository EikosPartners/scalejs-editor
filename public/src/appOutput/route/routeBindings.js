export default {
    'route-setRoute': function () {
        return {
            text: this.text || '',
            click: () => {
                this.setRoute(this.route);
            }
        };
    }
};
