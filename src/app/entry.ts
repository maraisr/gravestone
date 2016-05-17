declare var require: any;

import Component from 'vue-class-component';

@Component({
	el: () => {return '#app'},
	template: require('./views/entry.pug')
})

class App {
	data():any {
		return {
			name: 'World'
		}
	}
}

new App();
