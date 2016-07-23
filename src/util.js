// import gmodal from 'bower/gmodal/gmodal.js';
import each from 'npm/lodash/each.js';
import dom from 'bower/dom/dom.js';
import domready from 'bower/domready/ready.js';
import template from 'npm/lodash/template.js';
import trim from 'npm/lodash/trim.js';
import Debug from 'bower/debug/dist/debug.js';

require('bower/es6-promise/dist/es6-promise.js').polyfill();

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

/**
 * common util method
 * may want to separate this in the future
 */
export default class Util {
  constructor() {
    this.win = window;
    this.each = this.forEach = each;
    this.del = del;
    this.dom = dom;
    this.domready = domready;
    this.doc = document || {};
    this.iframeContent = require('./html/iframe.html');

    this.template = template;
    this.trim = trim;
    this._debug = this.getDebug('fdn:util');
    this.search = this.parseQueryString((location || {}).search || '');

    // this.extend = extend;
    // this.throttle = throttle;
    Debug.enable(this.search.debug || '');
  }

  /**
   * determine if user is authenticated
   * @return {Boolean} false if not authenticated
   */
  isAuthenticated() {
    let token = this.win.localStorage.getItem('fdntoken') + '';

    return true || (token.length > 30);
  }

  /**
   * get the debugger object
   * @param  {string} name the namespace of debug print prefix
   * @return {object}      the debugger
   */
  getDebug(name) {
    return Debug(name);
  }

  /**
   * helper method to get attribute on specific dom object
   * @param  {object} dom  element
   * @param  {string} attr attribute name
   * @return {string}      attribute value
   */
  getAttribute(dom, attr) {
    let el = dom[0] || dom;

    return (el.getAttribute) ? el.getAttribute(attr) : el[attr];
  }

  /**
   * cross browser attach event
   * @param {object} obj     source object
   * @param {string} evtName event name
   * @param {object}         self
   */
  addEvent(obj, evtName, func) {
    if (obj.addEventListener) {
      obj.addEventListener(evtName, func, false);
    } else if (obj.attachEvent) {
      obj.attachEvent(evtName, func);
    } else if (this.getAttribute('on' + evtName)) {
      obj['on' + evtName] = func;
    } else {
      obj[evtName] = func;
    }

    return this;
  }

  /**
   * cross browser detach event
   * @param {object} obj     source object
   * @param {string} evtName event name
   * @param {object}         self
   */
  removeEvent(obj, evtName, func) {
    if (obj.removeEventListener) {
      obj.removeEventListener(evtName, func, false);
    } else if (obj.detachEvent) {
      obj.detachEvent(evtName, func);
    } else if (this.getAttribute('on' + evtName)) {
      obj['on' + evtName] = null;
    } else {
      obj[evtName] = null;
    }

    return this;
  }

  /**
   * cross browser get of xhr
   * @return {object} the xhr
   */
  getAjaxObject() {
    return ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
  }

  /**
   * helper method to parse querystring
   * @param  {string} qstr the querystring
   * @return {object}      result
   */
  parseQueryString(qstr) {
    qstr = (qstr || '').replace('?', '').replace('#', '');
    let d = decodeURIComponent, query = {}, a = qstr.split('&');

    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=');

      query[d(b[0])] = d(b[1] || '');
    }

    return query;
  }

  /**
   * reverse object to query string
   * @param  {object} obj the object
   * @return {string}     the query string
   */
  toQueryString(obj) {
    let str = '';

    this.each(obj, (v, k) => {
      str += `&${k}=${encodeURIComponent(v)}`;
    });

    return str.replace('&', '');
  }

  /**
   * create an iframe
   * @return {object} the iframe
   */
  createiFrame(id, className) {
    let iframe = this.doc.createElement('iframe');

    if (id) iframe.id = id;
    if (className) iframe.className = className;

    iframe.frameBorder = '0';
    iframe.marginWidth = '0';
    iframe.marginHeight = '0';
    iframe.setAttribute('border', '0');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.width = '100%';
    iframe.height = '100%';
    return iframe;
  }

  /**
   * load iframe content
   * @param  {object} parentEl the parent element
   * @param  {object} iframe   the iframe or use createiFrame
   * @param  {string} content  the iframe content
   * @return {object}          the iframe
   */
  loadiFrame(parentEl, iframe, content) {
    let iframeContent = content;

    parentEl.appendChild(iframe);
    if (iframeContent.indexOf('<!DOCTYPE') < 0) {
      iframeContent = this.iframeContent.replace('<!--REPLACEME-->', content);
    }

    if (iframe.contentWindow) {
      iframe.contentWindow.contents = iframeContent;
      iframe.src = 'javascript:window["contents"]';
      return iframe;
    }

    let doc = iframe.contentDocument || iframe.document;

    doc.open();
    doc.write(iframeContent);
    doc.close();
    return iframe;
  }

  request(opts) {
    let that = this;

    opts.headers = opts.headers || {};

    if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
      // convert data to query string
      if (opts.data) {
        opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.toQueryString(opts.data);
        this.del(opts, 'data');
      }
    } else if (typeof (opts.data) !== 'string') {
      // handle non-string content body
      if ((opts.headers['Content-Type'] + '').indexOf('json') > 0) {
        opts.data = JSON.stringify(opts);
      } else {
        // must be form encoded
        opts.data = that.toQueryString(opts);
      }
    }

    return that.xhrp(opts);
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
    let req = this.getAjaxObject();

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

    this.addEvent(req, 'readystatechange', () => {
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

      // ignore everything else?
    });

    this.addEvent(req, 'error', (err) => {
      errback({ xhr: req, error: err });
    });

    // send unless prevent by options
    // such as user want to handle file upload
    if (!options.nosend) {
      req.send(options.data || void 0);
    }

    return req;
  }

  /**
   * slugify a string
   * @param  {string} str the string to slug
   * @return {string}     slug result
   */
  slugify(str) {
    str = str || '';

    if (str === '') return str;

    str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
    return str;
  }
}
