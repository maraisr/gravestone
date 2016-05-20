import * as Vue from 'vue';
import Component from 'vue-class-component';

import Config from '../../config';

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
			authLoginUrl: `https://my.pocketsmith.com/oauth/authorize?response_type=code&client_id=${Config.app.client_id}&scope=${scopes.join(' ')}&redirect_uri=${Config.uri}login`
		}
	}

	created() {
		// check if `code` exists
		// if so:
		// POST https://api.pocketsmith.com/v2/oauth/access_token
		// grant_type: authorization_code
		// client_id: Config.client_id
		// client_secret: Config.client_secret
		// redirect_uri: Config.uri
		// code: query.code
	}
}
