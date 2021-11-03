import ReactDOMServer from 'react-dom/server';

import Page from '../Page';

import { renderHelper } from '../../../utils';

describe('Page', () => {
  it('Should render empty page when no props are passed', () => {
    const { getByRole } = renderHelper(
        <Page />
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(1);
    expect(getByRole('main').childElementCount).toBe(0);
  });

  it('Should render children props as is', () => {
    const children = <p>Test content</p>;

    const { getByRole } = renderHelper(
      <Page>
        {children}
      </Page>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(1);
    expect(getByRole('main').childElementCount).toBe(1);

    expect(getByRole('main').innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(children));
  });

  it('Should render header', () => {
    const header = <p>Test header</p>;

    const { getByRole } = renderHelper(
      <Page header={header} />
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(2);
    expect(getByRole('main').childElementCount).toBe(0);

    expect(getByRole('banner').parentElement.children[1].innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(header));
  });

  it('Should render content and header', () => {
    const children = <p>Test content</p>;
    const header = <p>Test header</p>;

    const { getByRole } = renderHelper(
      <Page header={header}>
        {children}
      </Page>
    );

    expect(getByRole('banner').parentElement.childElementCount).toBe(2);
    expect(getByRole('main').childElementCount).toBe(1);

    expect(getByRole('main').innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(children));
    expect(getByRole('banner').parentElement.children[1].innerHTML).toBe(ReactDOMServer.renderToStaticMarkup(header));
  });
});