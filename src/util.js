// import gmodal from 'bower/gmodal/gmodal.js';
import Promise from 'bower/es6-promise/dist/es6-promise.js';
import keys from 'npm/lodash/keys.js';
import extend from 'npm/lodash/extend.js';
import each from 'npm/lodash/each.js';
import map from 'npm/lodash/map.js';
import throttle from 'npm/lodash/throttle.js';
import dom from 'bower/dom/dom.js';
import domready from 'bower/domready/ready.js';

// allow for IE compatible object property delete
let del = (obj, key) => {
  obj[key] = null;
  try {
    delete obj[key];
  } catch (e) {
    let items = {};

    each(obj, (v, k) => {
      if (k !== key) {
        items[k] = v;
      }
    });

    return items;
  }
  return obj;
};

export default class Util {
  constructor() {
    this.each = this.forEach = each;
    this.map = this.collect = map;
    this.keys = keys;
    this.del = del;
    this.extend = extend;
    this.throttle = throttle;
    this.dom = dom;
    this.domready = domready;
    this.doc = document || {};
  }

  parseQueryString(qstr) {
    qstr = (qstr || '').replace('?', '').replace('#', '');
    let d = decodeURIComponent;
    let query = {};
    let a = qstr.split('&');

    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=');

      query[d(b[0])] = d(b[1] || '');
    }
    return query;
  }

  createiFrame(parentEl, content) {
    let iframe = this.doc.createElement('iframe');

    iframe.className = 'fdn-iframe';
    iframe.frameBorder = '0';
    iframe.marginWidth = '0';
    iframe.marginHeight = '0';
    iframe.scrolling = 'no';
    iframe.setAttribute('border', '0');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.width = '100%';
    iframe.height = '100%';
    parentEl.appendChild(iframe);

    if (iframe.contentWindow) {
      iframe.contentWindow.contents = content;
      iframe.src = 'javascript:window["contents"]';
      return iframe;
    }

    let doc = iframe.contentDocument || iframe.document;

    doc.open();
    doc.write(content);
    doc.close();
    return iframe;
  }

  /**
   * make xhr request with a promise
   * @param  {object} opts the options
   * @return {promise}     a promise
   */
  xhrp(opts) {
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
    return req;
  }
}

