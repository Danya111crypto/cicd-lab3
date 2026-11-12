export default [
  {
    ignores: ["coverage/**", "dist/**"]
  },
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "off"
    }
  }
];
