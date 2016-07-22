import $ from 'jquery';
import Util from './util';

let util = new Util();

export default class Feedinary {
  constructor() {
    this.config = {
      channel: 'homepage',
      url: 'http://localhost:3000/api/',
      header: '<div class="fdn-content">',
      footer: require('styles/fdn.css'),
      emptyText: '<div class="fdn-content"><div class="fdn-desc"></div></div>'
    };
  }

  init(client, theme, channel, url) {
    this.config.fdnedit = ((location || {}).search || '').indexOf('fdnedit') > -1;
    this.config.client = client || this.config.client;
    this.config.theme = theme || this.config.theme;
    this.config.channel = channel || this.config.channel;
    this.config.url = url || this.config.url;
    this.config.css = ``;

    $('[data-fdn-name]').addClass('fdn-container');
    this.injectStyles('fdn');

    if (this.config.fdnedit) {
      $('.fdn-container:empty').html(this.config.emptyText);
    }
  }

  injectStyles(id, rule) {
    let rulez = rule || this.config.css;
    let elId = `stylez_${id}`;

    if ($(elId).length <= 0) {
      let $div = `<div id="${elId}"><style>${rulez}</style></div>`;

      $($div).appendTo('body');
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
    let el = $(`[data-fdn-name='${myName}']`);

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
