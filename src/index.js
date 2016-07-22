import $ from 'jquery';
import Feedinary from './feedinary';
import Util from './util';

let util = new Util();
let fdn = new Feedinary();

util.each($("script[src*='/fdn.']"), (i, e) => {
  let data = $(e).data();

  util.each(data, (k, v) => {
    if (['client', 'theme', 'name', 'url'].indexOf(k) > 0) {
      if (typeof (v) === 'string') {
        fdn.opts[k] = v;
      }
    }
  });
});

$(() => {
  fdn.init();
});
export default fdn;
