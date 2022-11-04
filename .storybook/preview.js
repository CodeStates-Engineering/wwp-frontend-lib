import '../src/scss/global.scss';
import '@storybook/addon-console';
import { Link, useLocation, MemoryRouter } from 'react-router-dom';
import { replaceDependency } from '../src/plugins';

replaceDependency({
  Link,
  usePathname: () => useLocation().pathname,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <div
        id="preview-wrap"
        style={{
          display: 'flex',
          minHeight: '80vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    </MemoryRouter>
  ),
];
