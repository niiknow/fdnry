import Util from './util';
import FeedinaryEdit from './feedinary-edit.js';

require('styles/fdn.css');
let util = new Util();
let debug = util.getDebug('fdn:main');

export default class Feedinary {
  constructor() {
    this.win = window;
    this.config = {
      channel: 'homepage',
      url: 'http://localhost:3000/api/',
      header: '',
      emptyText: '<div class="fdn-desc"></div>'
    };
  }

  init(client, theme, channel, url) {
    this.config.qs = util.parseQueryString((location || {}).search || '');
    this.config.client = client || this.config.client;
    this.config.theme = theme || this.config.theme;
    this.config.channel = channel || this.config.channel;
    this.config.url = url || this.config.url;

    debug('init');
    util.dom('[id^="fdn_"]').addClass('fdn-container');
    if (this.config.qs.fdnmode === 'edit') {
      this.editor = new FeedinaryEdit(this);
    } else if (this.config.qs.fdnmode === 'preview') {
      debug('entered preview mode');
      util.dom('.fdn-desc').addClass('fdn-preview');
    }
  }

  fetchContent(opts) {
    opts.url = opts.url || this.opts.url;
    opts.data = opts.data || {};
    opts.data.client = this.opts.client;
    opts.data.type = 'content';
    opts.data.channel = this.opts.channel;
    opts.method = opts.method || 'GET';

    if (this.config.theme) {
      opts.data.theme = opts.data.theme || this.config.theme;
    }

    return util.request(opts);
  }

  getContent(name, item) {
    let that = this;
    let rst = {};

    name = util.slugify(name).replace('fdn_', '');

    // get the content
    item = item || (this.cache || {})[name];

    // build the header
    let html = `${that.config.header}`;
    let pi = (item.pi || '');

    pi = (pi.indexOf(']') > 0) ? JSON.parse(pi) : [pi];

    // build impression pixel tracking
    util.each(pi, (v, k) => {
      if (v.length > 5) {
        debug(`composing pi ${v}`);
        html += `<img class="fdn-pi" width="1" height="1" border="0" src="${v}" />`;
      }
    });

    if (item.desc.indexOf('</script>') > 0 || (item.meta || {}).iframe) {
      // auto iframe
      html += `<div class="fdn-desc"></div>${that.config.footer}`;
      rst.iframe = true;
    } else {
      html += `<div class="fdn-desc">${item.desc}</div>${that.config.footer}`;
    }

    // string macro handling - possibly use lodash template?
    if (html.indexOf('<%=') > -1) {
      debug(`compiling template`);
      let obj = {
        client: this.config.client,
        channel: this.config.channel,
        nc: new Date().getTime(),
        name: name,
        item: item
      };
      let compiled = util.template(html);

      html = compiled(obj);
    }

    rst.html = html;
    rst.item = item;

    return rst;
  }

  renderItem(name, item) {
    let cancel = false;
    let rst = {
      rendered: 0,
      canceled: 0
    };

    name = util.slugify(name).replace('fdn_', '');

    // find the destination element, quit if not found
    let el = util.dom(`[id='fdn_${name}']`);

    if (el.length < 0) return rst;
    if (this.onBeforeRender) cancel = this.onBeforeRender(name, item);

    if (!cancel) {
      // get the item
      let item = this.getContent(name, item);

      el.html('').html(item.html || '');
      if (item.iframe) {
        let descEl = el.find('.fdn-desc');

        debug('rendering iframe for item ' + name);
        util.createiFrame(descEl, item.desc);
      }
      rst.rendered++;

      // trigger on after render
      if (this.onAfterRender) this.onAfterRender(name, item);
    } else {
      debug('rendering canceled for item ' + name);
      rst.canceled++;
    }

    return rst;
  }

  renderAll() {
    let that = this;

    util.each(this.cache, (v, k) => {
      that.renderItem(k, v);
    });

    return that;
  }

  /**
   * process all cache data url
   * @return {promise} when all cache data are completed
   */
  processCache() {
    let that = this;
    let promisses = [];

    that.cacheData = {};
    util.each(that.cache, (v, k) => {
      if (v.dataurl) {
        let p = util.request({ url: v.dataurl });

        p.then((rsp) => {
          let text = rsp.text;

          that.cacheData[k] = (text.indexOf('}') > 0 || text.indexOf(']') > 0) ? JSON.parse(text) : text;
        });
        promisses.push(p);
      }
    });

    return Promise.all(promisses);
  }

  /**
   * render specific content by name
   * @param  {string} name content name resolve by id=fdn_name
   * @return {object}      self
   */
  render(name) {
    let that = this;

    name = util.slugify(name).replace('fdn_', '');

    if (!that.cache) {
      debug('fetching content');
      that.fetchContent({
        data: { channel: that.config.channel }
      }).then((rsp) => {
        that.cache = JSON.parse(rsp.text);
        that.processCache().then(() => {
          if (name) {
            that.rednerItem(name);
          } else {
            that.renderAll();
          }
        });
      }, () => {
        debug('error getting data');
        that.cache = {};
      });
    } else {
      debug('rendering from cache');
      if (name) {
        that.rednerItem(name);
      } else {
        that.renderAll();
      }
    }

    return that;
  }
}
