import $ from 'jquery';
import Util from './util';

export default class Feedinary {
  constructor() {
    this.config = {
      channel: 'homepage',
      url: 'http://localhost:3000/api/',
      header: '<div class="fdn-content">',
      footer: '',
      emptyText: '<div class="fdn-content"><div class="fdn-desc"></div></div>'
    };
  }

  init(client, theme, channel, url) {
    this.config.fdnedit = ((location || {}).search || '').indexOf('fdnedit') > -1;
    this.config.client = client || this.config.client;
    this.config.theme = theme || this.config.theme;
    this.config.channel = channel || this.config.channel;
    this.config.url = url || this.config.url;
    this.config.css = `.fdn-content {
  position: relative;
}
.fdn-desc:empty:not(focus):before {
  content: "[[empty]]";
  color: #ccc;
}
.fdn-desc:hover {
  cursor: pointer;
  border: 2px dashed #ccc;
}
.fdn-desc:hover:after {
  content: "tap/click to edit...";
  padding: 4px 8px;
  color: #000;
  position: absolute;
  left: 0;
  top: -30px;
  z-index: 20;
  white-space: nowrap;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 0px 0px 4px #222;
  -webkit-box-shadow: 0px 0px 4px #222;
  box-shadow: 0px 0px 4px #222;
  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #eeeeee),color-stop(1, #cccccc));
  background-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -o-linear-gradient(top, #eeeeee, #cccccc);
}`;

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
      $.each(pi, (k, v) => {
        if (v.length > 5) {
          let vs = v;

          if (v.indexOf('[[') > 0) {
            vs = vs.replace('[[client]]', that.config.client);
            vs = vs.replace('[[channel]]', that.config.channel);
            vs = vs.replace('[[nc]]', new Date().getTime());
            vs = vs.replace('[[name]]', myName);
          }

          html += `<img class="fdn-pi" width="1" height="1" border="0" src="${vs}" />`;
        }
      });

      html += `<div class="fdn-desc">${content.desc}</div>${that.config.footer}</div>`;
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
