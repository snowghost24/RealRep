module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: [ 'error', 4, { SwitchCase: 1 } ],
        quotes: [ 'error', 'single', { avoidEscape: true } ],
        'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx' ] } ],
        'react/jsx-indent': [ 2, 4, { checkAttributes: false, indentLogicalExpressions: true } ],
        'react/jsx-indent-props': [ 1, 4 ],

        // spacing
        'space-in-parens': [ 2, 'always' ],
        'template-curly-spacing': [ 2, 'always' ],
        'array-bracket-spacing': [ 2, 'always' ],
        'object-curly-spacing': [ 2, 'always' ],
        'computed-property-spacing': [ 2, 'always' ],
        'no-multiple-empty-lines': [ 2, { max: 1, maxEOF: 0, maxBOF: 0 } ],

        // line length
        'max-len': [ 'error', {
            code: 120,
            ignoreTrailingComments: true,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        } ],

        // strings
        'linebreak-style': [ 0 ],

        // code arrangement matter
        'no-use-before-define': [ 2, { functions: false } ],

        // make it meaningful
        'prefer-const': 1,

        // keep it simple
        complexity: [ 1, 5 ],

        // react

        'react/jsx-curly-spacing': [ 2, 'always' ],
        'react/jsx-one-expression-per-line': 0,

        // es5 based (legacy support)
        'func-names': 0,
        'space-before-function-paren': [ 'error', 'never' ],
        'prefer-template': 0,
        'object-shorthand': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'prefer-destructuring': 0,
        strict: 0,
    },
};
