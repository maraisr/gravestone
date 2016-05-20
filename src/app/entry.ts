import * as Vue from 'vue';
import Component from 'vue-class-component';

import * as VueResource from 'vue-resource';
import * as VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = 'https://api.pocketsmith.com/v2';

import Auth from './stores/auth';
import Router from './stores/router';

@Component({
	template: require('./entry.pug'),
	replace: false
})
class App extends Vue {
	data(): any {
		return {
			logged: Auth.isLogged
		}
	}

	created(): void {
		if (!Auth.isLogged) {
			this.$route.router.go({name: 'login'});
		}
	}
}

Router.start(App, '#app');
