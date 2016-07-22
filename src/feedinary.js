import Util from './util';

require('bower/gmodal/gmodal.js');
require('styles/fdn.css');
let myContent = require('./html/editor.html');
let util = new Util();

export default class Feedinary {
  constructor() {
    this.win = window;
    this.config = {
      channel: 'homepage',
      url: 'http://localhost:3000/api/',
      header: '<div class="fdn-content">',
      emptyText: '<div class="fdn-content"><div class="fdn-desc"></div></div>'
    };
  }

  init(client, theme, channel, url) {
    this.config.qs = util.parseQueryString((location || {}).search || '');
    this.config.client = client || this.config.client;
    this.config.theme = theme || this.config.theme;
    this.config.channel = channel || this.config.channel;
    this.config.url = url || this.config.url;
    this.config.css = ``;
    let that = this;

    util.dom('[id^="fdn-"]').addClass('fdn-container');
    if (this.config.qs.fdnmode === 'edit') {
      let myDom = util.dom('.fdn-container:empty');

      myDom.html(this.config.emptyText);
      util.dom('.fdn-desc').addClass('fdn-edit');
      myDom.on('click', (evt) => {
        // open edit modal
        that.win.gmodal.show({content: myContent, hideOn: 'click,esc,tap'});
      });
    } else if (this.config.qs.fdnmode === 'preview') {
      util.dom('.fdn-desc').addClass('fdn-preview');
    }
  }

  getContent(opts) {
    opts.url = opts.url || this.opts.url;
    opts.data.client = this.opts.client;
    opts.data.type = 'content';
    opts.data.channel = this.opts.channel;

    if (this.config.theme) {
      opts.data.theme = opts.data.theme || this.config.theme;
    }

    let ut = new Util();

    return ut.request(opts);
  }

  renderContent(name, content) {
    let that = this;
    let cancel = false;
    let myName = name.toLowerCase();

    // find the destination element, quit if not found
    let el = util.dom(`[id='fdn-${myName}']`);

    if (el.length < 0) {
      return;
    }

    if (this.onBeforeRender) {
      cancel = this.onBeforeRender(myName, content);
    }

    if (!cancel) {
      // get the content
      content = content || (this.cache || {})[myName];

      // build the header
      let html = `${that.config.header}`;
      let pi = (content.pi || '').split(',');

      // build impression pixel tracking
      util.each(pi, (v, k) => {
        if (v.length > 5) {
          html += `<img class="fdn-pi" width="1" height="1" border="0" src="${v}" />`;
        }
      });

      html += `<div class="fdn-desc">${content.desc}</div>${that.config.footer}</div>`;

      if (html.indexOf('[[') > 0) {
        html = html.replace('[[client]]', that.config.client);
        html = html.replace('[[channel]]', that.config.channel);
        html = html.replace('[[nc]]', new Date().getTime());
        html = html.replace('[[name]]', myName);
      }

      el.html('').html(html || '');
    }

    // trigger on after render
    if (this.onAfterRender) {
      this.onAfterRender(myName, content);
    }
  }

  render(name) {
    let that = this;

    if (!that.cache) {
      that.getContent({
        data: { channel: that.config.channel }
      }).then((data) => {
        if (typeof (data) === 'undefined') {
          // do nothing
          that.cache = {};
        } else if (typeof (data) === 'string' && data.indexOf('{') > 0) {
          that.cache = JSON.parse(data);
        } else {
          that.cache = data;
        }
        if (name) {
          that.renderContent(name);
        } else {
          // loop through and render content
          for (let k in that.cache) {
            that.renderContent(k);
          }
        }
      });
    } else {
      if (name) {
        that.renderContent(name);
      } else {
        // loop through and render content
        for (let k in that.cache) {
          that.renderContent(k);
        }
      }
    }
  }
}
