module.exports = {
  plugins: ["@typescript-eslint", "jest"],
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@next/next/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-restricted-exports": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/array-type": ["error", { "default": "array" }],
    "func-names": "off"
  },
};
