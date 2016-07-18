import $ from 'jquery';
import Util from './util';

export default class Feedinary {
  constructor(clientId, theme, apiUrl) {
    this._clientId = clientId;
    this._theme = theme;
    this._apiUrl = apiUrl || 'http://localhost:3000/api/';
  }

  getContent(opts) {
    opts.url = opts.url || this._apiUrl;
    opts.data.client = this._clientId;
    opts.data.type = 'content';
    if (this._theme) {
      opts.data.theme = opts.data.theme || this._theme;
    }

    let ut = new Util();

    return ut.request(opts);
  }

  renderContent(name, title, content) {
    let cancel = false;

    if (this.onBeforeRender) {
      cancel = this.onBeforeRender(name, title, content);
    }

    if (!cancel) {
      content = content || (this.cache || {})[title];
      $(`[data-df-name='${name}'][data-fd-title='${title}']`).html('').html(content || '');
    }

    // trigger on after render
    if (this.onAfterRender) {
      this.onAfterRender(name, title, content);
    }
  }

  render(name, title) {
    let $that = this;

    if (!this.cache) {
      this.getContent({
        data: { name: name }
      }).then((data) => {
        if (typeof (data) === 'undefined') {
          // do nothing
          $that.cache = {};
        } else if (typeof (data) === 'string' && data.indexOf('{') > 0) {
          $that.cache = JSON.parse(data);
        } else {
          $that.cache = data;
        }
        if (title) {
          $that.renderContent(name, title);
        } else {
          // loop through and render content
          for (let k in $that.cache) {
            $that.renderContent(name, k);
          }
        }
      });
    }
  }
}

