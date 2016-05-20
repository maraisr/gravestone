class Auth {
	get jwt():any {
		return JSON.parse(localStorage.getItem('authJwt'));
	}

	set jwt(to: any) {
		localStorage.setItem('authJwt', JSON.stringify(to));
	}

	get isLogged(): boolean {
		return (localStorage.getItem('authJwt') ? true : false);
	}
}

export default new Auth();
