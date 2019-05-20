module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        jquery: true,
        browser: true,
        node: true
    },
    extends: 'standard',
    plugins: ['html'],
    rules: {
        indent: 'off',
        // indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': 'off',
        'standard/computed-property-even-spacing': 'off',
        'no-fallthrough': 'off',
        'no-trailing-spaces': 'off',
        'one-var': 'off',
        'no-debugger': 'off',
        camelcase: 'off'
    }
}
