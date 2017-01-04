import Util from './util';
import FeedinaryEdit from './feedinary-edit.js';
require('styles/fdn.css');
require('bower/toolbar/jquery.toolbar.css');
let util = new Util();
/**
 * main app
 */
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

  /**
   * initialize this object
   * @param  {string} client  the client id or name
   * @param  {string} theme   default channel
   * @param  {string} channel name for content channel
   * @param  {string} url     Feedinary api url
   * @return {object}         fdn
   */
  init(client, theme, channel, url) {
    this.config.client = client || this.config.client;
    this.config.theme = theme || this.config.theme;
    this.config.channel = channel || this.config.channel;
    this.config.url = url || this.config.url;
    this.util = util;
    this.config.review = false;
    util.dom('[id^="fdn_"]').addClass('fdn-container');
    if (util.search.fdnmode === 'edit') {
      this.config.review = true;
      this.editor = new FeedinaryEdit(this);
    } else if (util.search.fdnmode === 'preview') {
      this.config.review = true;
      util.dom('.fdn-desc').addClass('fdn-preview');
    }
    return this;
  }

  /**
   * make xhr request for data
   * {
   *   data: 'object: the data object',
   *   url: 'string: default(null) - the url to get the data'
   * }
   *
   * alternatively, use util.request for any custom request
   * @param  {object} opts the option
   * @return {object}      the xhr promise
   */
  fetchContent(opts) {
    opts.url = opts.url || this.opts.url;
    opts.data = opts.data || {};
    opts.data.client = this.opts.client;
    opts.data.type = 'content';
    opts.data.channel = this.opts.channel;
    opts.data.review = this.config.review;
    opts.method = opts.method || 'GET';
    if (this.config.theme) {
      opts.data.theme = opts.data.theme || this.config.theme;
    }
    return util.request(opts);
  }

  /**
   * get the compiled content of an item
   * @param  {string} name the id or name
   * @return {object}      item and it's html
   */
  getContent(name) {
    let that = this,
      item, rst = {};
    name = util.slugify(name).replace('fdn_', '');
    // get the content
    item = (this.cache || {})[name];
    if (!item) {
      return rst;
    }
    // build the header
    let html = `${that.config.header}`;
    let pi = (item.pi || '');
    pi = (pi.indexOf(']') > 0) ? JSON.parse(pi) : [pi];
    // build impression pixel tracking
    util.each(pi, (v, k) => {
      if (v.length > 5) {
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

  /**
   * render or refresh specific item
   * @param  {string} name the id or name
   * @return {object}      render stat
   */
  renderItem(name) {
    let cancel = false;
    let rst = {
      rendered: 0,
      canceled: 0
    };
    name = util.slugify(name).replace('fdn_', '');
    // find the destination element, quit if not found
    let el = util.dom(`[id='fdn_${name}']`);
    if (el.length < 0) return rst;
    if (this.onBeforeRender) cancel = this.onBeforeRender(name);
    if (!cancel) {
      // get the item
      let item = this.getContent(name);
      el.html('').html(item.html || '');
      if (item.iframe) {
        let descEl = el.find('.fdn-desc');
        util.loadiFrame(descEl, util.createiFrame(null, 'fdn-iframe'), item.desc);
      }
      rst.rendered++;
      // trigger on after render
      if (this.onAfterRender) this.onAfterRender(name, item);
    } else {
      rst.canceled++;
    }
    return rst;
  }

  /**
   * render/refresh all
   * @return {object} fdn
   */
  renderAll() {
    let that = this;
    util.each(this.cache, (v, k) => {
      that.renderItem(k);
    });
    return that;
  }

  /**
   * process all cache data url
   * @return {promise} when all data are completed
   */
  processCache() {
    let that = this;
    let promisses = [];
    that.cacheData = {};
    util.each(that.cache, (v, k) => {
      let dataurl = v.dataurl + '';
      if (dataurl.length > 20) {
        let p = util.request({
          url: dataurl
        });
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
   * @return {object}      fdn
   */
  render(name) {
    let that = this;
    name = util.slugify(name).replace('fdn_', '');
    if (!that.cache) {
      that.fetchContent({
        data: {
          channel: that.config.channel
        }
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
        that.cache = {};
      });
    } else {
      if (name) {
        that.rednerItem(name);
      } else {
        that.renderAll();
      }
    }
    return that;
  }
}
