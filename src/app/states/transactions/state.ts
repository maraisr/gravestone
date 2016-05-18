import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	template: require('./index.pug')
})
export class State extends Vue {
	ready() {
		// TODO: we need the current user to be stored in something
		this.$http.get(`users/1/transactions`)
			.then((resp) => {
				this.$set('transactions', resp.data);
			});
	}
}
