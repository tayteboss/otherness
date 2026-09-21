// Isolated checks because the legacy .eslintrc contains an invalid rule setting.
module.exports = {
	root: true,
	env: { node: true, es2022: true },
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['@typescript-eslint'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
	},
	globals: { window: 'readonly' }
};
