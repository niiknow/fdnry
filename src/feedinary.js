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
    this.config.css = ``;
    let that = this;

    util.dom('[id^="fdn_"]').addClass('fdn-container');
    if (this.config.qs.fdnmode === 'edit') {
      let myDom = util.dom('.fdn-container:empty');

      myDom.html(this.config.emptyText);
      util.dom('.fdn-desc').addClass('fdn-edit');
      util.dom('[id^="fdn_"] > .fdn-desc').on('click', (evt) => {
        evt = evt || that.win.event;
        let tg = evt.target || evt.srcElement;

        if (tg.nodeType === 3) {
          tg = tg.parentNode;
        }
        let el = util.dom(tg);

        while (!el.hasClass('fdn-container')) {
          el = util.dom(el[0].parentNode);
        }

        // figure out what item this is
        let itemId = (el[0].id || '').replace('fdn_', '');

        // open edit modal
        if (itemId) {
          that.editItem(itemId);
        }
      });
    } else if (this.config.qs.fdnmode === 'preview') {
      util.dom('.fdn-desc').addClass('fdn-preview');
    }
  }

  fetchContent(opts) {
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

  getContent(name, item) {
    let that = this;
    let rst = {};

    // get the content
    item = item || (this.cache || {})[name];

    // build the header
    let html = `${that.config.header}`;
    let pi = (item.pi || '').split(',');

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

    if (html.indexOf('[[') > 0) {
      html = html.replace('[[client]]', that.config.client);
      html = html.replace('[[channel]]', that.config.channel);
      html = html.replace('[[nc]]', new Date().getTime());
      html = html.replace('[[name]]', name);
    }

    rst.html = html;
    rst.item = item;

    return rst;
  }

  editItem(name, item) {
    let that = this;

    // get the content
    item = item || (this.cache || {})[name] || { desc: '' };

    this.edit = { name: name, item: item };

    // open edit modal
    that.win.gmodal.show({ content: myContent, hideOn: 'click,esc,tap' });
  }

  renderItem(name, item) {
    let cancel = false;
    let myName = name.toLowerCase();

    // find the destination element, quit if not found
    let el = util.dom(`[id='fdn_${myName}']`);

    if (el.length < 0) {
      return;
    }

    if (this.onBeforeRender) {
      cancel = this.onBeforeRender(myName, item);
    }

    if (!cancel) {
      // get the item
      let item = this.getContent(name, item);

      el.html('').html(item.html || '');
      if (item.iframe) {
        let descEl = el.find('.fdn-desc');

        util.createiFrame(descEl, item.desc);
      }
    }

    // trigger on after render
    if (this.onAfterRender) {
      this.onAfterRender(myName, item);
    }
  }

  render(name) {
    let that = this;

    if (!that.cache) {
      that.fetchContent({
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
          that.rednerItem(name);
        } else {
          // loop through and render content
          for (let k in that.cache) {
            that.rednerItem(k);
          }
        }
      });
    } else {
      if (name) {
        that.rednerItem(name);
      } else {
        // loop through and render content
        for (let k in that.cache) {
          that.rednerItem(k);
        }
      }
    }
  }
}
