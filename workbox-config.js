module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,svg,ico,html,txt,js,css,png}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};