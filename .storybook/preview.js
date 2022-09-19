import "../src/scss/global.scss";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div id="preview-wrap" style={{ margin: "1em auto" }}>
      <Story />
    </div>
  ),
];
