import { Webshop } from './app.po';
import { browser, element, by } from 'protractor';

describe('kurland App', () => {
  let page: Webshop;

  beforeEach(() => {
    page = new Webshop();
  });

  it('1.0: should test that e2e works (simplest test)', () => {
    
    browser.get('');
    browser.waitForAngularEnabled(false);
    element(by.id('home-login')).click();
    expect(element(by.css('h1')).getText()).toEqual('Login');

    expect(true).toBeTruthy();
  });

  it('1.1: should create a new product', () => {

    element.all(by.id('items-id')).then((el) => {
      const before = el.length;
      browser.get('/admin/products')
      browser.sleep(1000);
      element(by.id('new-product')).click();
      browser.sleep(1000);
      element(by.id('title')).sendKeys('MSI GX 300 Gaming Computer');
      browser.sleep(1000);
      element(by.id('price')).sendKeys('13000');
      browser.sleep(1000);
      element(by.id('category')).$('[value="computer"]').click();
      browser.sleep(1000);
      element(by.id('imageUrl')).sendKeys('https://bgaming.dk/image/cache/catalog/Computere/msi-aegis-3-gamer-pc/msi-aegis-3-gamer-pc-1-800x800.jpg');
      browser.sleep(1000);
      element(by.id('save')).click();
      browser.sleep(2000);


      element.all(by.id('items-id')).then((el2) => {
        const after = el2.length;

        expect(before + 1).toEqual(after);

      });

    });

  });

  it('1.2: should delete a product', () => {

    browser.get('/admin/products')
    browser.sleep(1000);
    element.all(by.id('items')).then((el) => {
      const before = el.length;
    element.all(by.id('edit-id')).get(18).click();
    browser.sleep(3000)
    element(by.id('delete')).click();

    element.all(by.id('items')).then((el2) => {
      const after = el2.length;

      expect(after).toEqual(before);

    });

    });

  });

});