// import gmodal from 'bower/gmodal/gmodal.js';
import Promise from 'bower/es6-promise/dist/es6-promise.js';

export default class Util {
  constructor() {}

  each(obj, doIter) {
    if (typeof (obj) === 'object') {
      for (let k in obj) doIter(obj[k], k);
      return;
    }

    for (let i = 0; i < obj.length; i++) doIter(obj[i], i);
  }

  /**
   * make xhr request
   * @param  {object} opts the options
   * @return {promise}     a promise
   */
  request(opts) {
    let that = this;

    return new Promise((resolve, reject) => {
      return that.xhr(opts, resolve, reject);
    });
  }

  /**
   * make an xhr request
   * @param  {object}   options  url string or options object
   * @param  {Function} callback
   * @param  {Function} errback  error callback
   */
  xhr(options, callback, errback) {
    let url = options;

    if (typeof url === 'string') {
      options = options || {};
      options.url = url;
    }

    // Create the XHR request itself
    let req = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

    if (options.withCredentials) {
      req.withCredentials = true;

      if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        req = new XDomainRequest();
      }
    }

    // if there are no options, it failed
    if (!options || options.length === 0) {
      errback({ xhr: req, error: new Error('xhr expects an url or an options object, none given.') });
    }

    // normalize method
    options.method = options.method || 'GET';

    // open url
    req.open(options.method, options.url, req.withCredentials);

    // set request header
    this.each(options.headers || {}, (value, key) => {
      req.setRequestHeader(key, value);
    });

    req.onreadystatechange = () => {
      if (req.readyState === 4 && (req.status >= 200 && req.status < 400)) {
        // Callbacks for successful requests
        callback({
          xhr: req,
          text: req.responseText,
          url: req.responseURL
        });
      } else if (req.readyState === 4) {
        // Callbacks for failed requests
        errback({
          xhr: req
        });
      }
    };

    req.onerror = (err) => {
      errback({ xhr: req, error: err });
    };

    req.send(options.data || void 0);
  }
}

