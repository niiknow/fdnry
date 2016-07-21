import $ from 'jquery';
import Feedinary from './feedinary';

let fdn = new Feedinary();

$("script[src*='/fdn.']").each((i, e) => {
  let data = $(e).data();

  $.each(data, (k, v) => {
    if (['client', 'theme', 'name', 'url'].indexOf(k) > 0) {
      if (typeof (v) === 'string') {
        fdn.opts[k] = v;
      }
    }
  });
});

export default fdn;
