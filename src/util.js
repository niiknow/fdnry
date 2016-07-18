import $ from 'jquery';

export default class Util {
  constructor() {}

  /**
   * make request
   * @param  {[type]} method  method
   * @param  {[type]} url     url
   * @param  {[type]} headers header object
   * @param  {[type]} body    body object
   * @param  {String} type    response type
   * @return {[type]}         a promise
   */
  request(opts) {
    opts.method = opts.method || 'get';
    return $.ajax(opts.url, opts);
  }
}
