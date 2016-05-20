class Auth {
	get profile():any {
		return JSON.parse(localStorage.getItem('authProfile'));
	}

	set profile(to: any) {
		localStorage.setItem('authProfile', to);
	}

	get isLogged(): boolean {
		return (localStorage.getItem('authProfile') ? true : false);
	}
}

export default new Auth();
