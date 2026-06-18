const packageRoot = "node_modules/mwlog-js";

export const themes = Object.freeze({
  default: `${packageRoot}/themes/default.css`,
  light: `${packageRoot}/themes/light.css`,
  dark: `${packageRoot}/themes/dark.css`,
  custom: Object.freeze({
    sample: `${packageRoot}/themes/custom/sample.css`,
  }),
});
