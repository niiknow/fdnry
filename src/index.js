import Feedinary from './feedinary';
import Util from './util';

let util = new Util();
let fdn = new Feedinary();

util.each(util.dom("script[src*='/fdn.']"), (e, i) => {
  util.each(['', 'data-'], (v, k) => {
    util.each(['client', 'theme', 'name', 'url'], (v2, k2) => {
      let attr = e.getAttribute(v + k2);

      if (attr) {
        fdn.opts[k2] = attr;
      }
    });
  });
});

util.domready(() => {
  fdn.init();
});
export default fdn;
