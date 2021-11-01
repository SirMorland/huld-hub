import ReactDOMServer from 'react-dom/server';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';

import Page from '../Page';

import theme from '../../../theme';

describe('Page', () => {
  it('Should render empty page when no props are passed', () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(1);
    expect(getByRole('main').childElementCount).toBe(0);
  });

  it('Should render children props as is', () => {
    const children = <p>Test content</p>;

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Page>
          {children}
        </Page>
      </ThemeProvider>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(1);
    expect(getByRole('main').childElementCount).toBe(1);

    expect(getByRole('main').innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(children));
  });

  it('Should render header', () => {
    const header = <p>Test header</p>;

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Page header={header} />
      </ThemeProvider>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(2);
    expect(getByRole('main').childElementCount).toBe(0);

    expect(getByRole('banner').parentElement.children[1].innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(header));
  });

  it('Should render content and header', () => {
    const children = <p>Test content</p>;
    const header = <p>Test header</p>;

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Page header={header}>
          {children}
        </Page>
      </ThemeProvider>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(2);
    expect(getByRole('main').childElementCount).toBe(1);

    expect(getByRole('main').innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(children));
    expect(getByRole('banner').parentElement.children[1].innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(header));
  });
});