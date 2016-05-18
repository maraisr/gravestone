declare var require: any;

import * as Vue from 'vue';

import Component from 'vue-class-component';
import * as VueResource from 'vue-resource';

import Config from './config';

Vue.use(VueResource);
Vue.http.options.root = 'https://api.pocketsmith.com/v2';
Vue.http.headers.common['Authorization'] = `Bearer ${Config.pocketsmithApi}`;

@Component({
	el: () => { return '#app' },
	template: require('./views/entry.pug')
})
class App extends Vue {
	private userData: any;

	data(): any {
		return {
			loaded: false,
			user: void 0,
			transactions: []
		};
	}

	ready(): void {
		// Get the authed user
		this.$http.get('me')
			.then((resp) => {
				if (resp.status == 200) {
					this.userData = resp.data;
					this.$set('user', resp.data);

					this.getTransactions();
				}
			});
	}

	private getTransactions() {
		this.$http.get(`users/${this.userData.id}/transactions`)
			.then((resp) => {
				this.$set('transactions', resp.data);
				this.$set('loaded', true);
			})
	}
}

new App();
