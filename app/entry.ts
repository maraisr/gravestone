declare var require: any;

export class Test {
    private name: String;

    constructor() {
        this.name = 'World';

        console.log(require('./views/entry.pug'));
    }
}
