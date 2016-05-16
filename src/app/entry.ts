declare var require: any;

import * as Vue from 'vue';

class Test {
    constructor() {
        new Vue({
            el: '#app',
            template: require('./views/entry.pug'),
            data: () => {
                return {
                    name: 'World'
                }
            }
        });
    }
}

new Test();
