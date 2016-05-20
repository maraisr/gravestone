import * as VueRouter from 'vue-router';

import Auth from '../stores/auth';

import transState from '../states/transactions/state';
import loginState from '../states/login/state';
import dashState from '../states/dashboard/state';

var router = new VueRouter();

router.map({
	'/login': {
		name: 'login',
		component: loginState,
		auth: false
	},
	'/dashboard': {
		name: 'dashboard',
		component: dashState,
		auth: true
	},
	'/transactions': {
		name: 'transactions',
		component: transState,
		auth: true
	}
});

router.beforeEach((trans:any) => {
	if (trans.to.auth && !Auth.isLogged) {
		trans.redirect('/login');
	} else {
		trans.next();
	}
});

export default router;
