declare var require: any;

export class Test {
    constructor() {
        new Vue({
            el: '#app',
            template: require('./views/entry.pug')
        });
    }
}
