import { SimpleShopPage } from './app.po';

describe('simple-shop App', () => {
  let page: SimpleShopPage;

  beforeEach(() => {
    page = new SimpleShopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
