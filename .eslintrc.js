module.exports = {
  env: {
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: 0,
  },
  resolve: ["node_modules/"],
};
