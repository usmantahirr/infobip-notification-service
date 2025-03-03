const js = require("@eslint/js");
const n = require("eslint-plugin-n");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
      n,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
