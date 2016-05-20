declare var __DEV__: any;

export default {
	app: require('../../app.config.json'),
	uri: (__DEV__ ? 'http://localhost:3303/#!/' : 'https://gravestone.io/#!/')
}
