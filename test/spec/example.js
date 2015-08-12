var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

chaiAsPromised.transferPromiseness = browser.transferPromiseness;

describe('DuckDuckGo', function () {
  beforeEach(function (done) {
    browser.url('https://duckduckgo.com/', done);
    browser.cookie('post', {
      name: 'AD',
      value: 'en_US'
    });
  });

  it('Verify Title', function (done) {
    browser
      .getTitle().should.become('DuckDuckGo').notify(done);
  });

  it('Verify Title After Search', function (done) {
    var q = 'xml';
    browser
      .setValue('#search_form_input_homepage', q)
      .click('#search_button_homepage')
      .getTitle().should.eventually.equal(`${q} at DuckDuckGo`).notify(done);
  });

  it('Verify Title After Search Using Generator', function* () {
    var q = 'xslt';
    var title = yield browser
      .setValue('#search_form_input_homepage', q)
      .click('#search_button_homepage')
      .getTitle();
      
    title.should.equal(`${q} at DuckDuckGo`);
  });
});
