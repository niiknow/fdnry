import Feedinary from './feedinary';
import Util from './util';
let util = new Util();
let fdn = new Feedinary();
util.each(util.dom("script[src*='/fdn.']"), (e, i) => {
  fdn.config['src'] = util.getAttribute(e, 'src');
  util.each(['', 'data-'], (v, k) => {
    util.each(['client', 'theme', 'name', 'url'], (v2, k2) => {
      let attr = util.getAttribute(e, v + k2);
      if (attr) {
        fdn.config[k2] = attr;
      }
    });
  });
});
util.domready(() => {
  fdn.init();
});
export default fdn;
