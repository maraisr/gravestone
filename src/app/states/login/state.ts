import * as Vue from 'vue';
import Component from 'vue-class-component';

import Config from '../../config';
import Auth from '../../stores/auth';

const scopes = [
	'transactions.read',
	'user.read',
	'categories.read',
	'accounts.read'
];

@Component({
	template: require('./index.pug')
})
export default class loginState extends Vue {
	data() {
		return {
			authLoginUrl: `https://my.pocketsmith.com/oauth/authorize?response_type=code&client_id=${Config.app.client_id}&scope=${scopes.join(' ')}&redirect_uri=${encodeURIComponent(`${Config.uri}login`)}`
		}
	}

	created() {
		if (this.$route.query.code) {
			this.$http.post('oauth/access_token', {
				grant_type: 'authorization_code',
				client_id: Config.app.client_id,
				client_secret: Config.app.client_secret,
				redirect_uri: Config.uri + 'login',
				code: this.$route.query.code
			})
				.then((resp) => {
					Auth.jwt = resp.data;
				})
		}
	}
}
