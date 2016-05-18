import * as Vue from 'vue';

import Component from 'vue-class-component';
import * as VueResource from 'vue-resource';
import * as VueRouter from 'vue-router';

import Config from './config';

import {State as tState} from './states/transactions/state.ts';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'https://api.pocketsmith.com/v2';
Vue.http.headers.common['Authorization'] = `Bearer ${Config.pocketsmithApi}`;

@Component({
	template: require('./views/entry.pug'),
	replace: false
})
class App extends Vue {
	data(): any {
		return {
			loaded: false,
			user: {}
		}
	}

	ready(): void {
		this.$http.get('me')
			.then((resp) => {
				if (resp.status == 200) {
					this.$set('user', resp.data);
					this.$set('loaded', true);
				}
			});
	}
}

var router = new VueRouter();

router.map({
	'/transactions': {
		name: 'transactions',
		component: tState
	}
});

router.start(App, '#app');
