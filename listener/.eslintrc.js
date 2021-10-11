module.exports = {
    env: {
        node: true,
        es6: true
    },
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint/eslint-plugin",
        "import",
        "prettier"
    ],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript/base",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "import/no-cycle": "off",
        "no-continue": "off",
        "no-plusplus": "off",
        "no-await-in-loop": "off",
        "no-underscore-dangle": ["error", {"allowAfterThis": true}],
        "class-methods-use-this": "off",
        "no-dupe-class-members": "off",
        "import/prefer-default-export": "off"
    },
    parserOptions: {
        "project": "./tsconfig.json"
    },
}