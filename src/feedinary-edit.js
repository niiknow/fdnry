import Util from './util';

require('bower/gmodal/gmodal.js');
let myContent = require('./html/editor.html');
let util = new Util();
let debug = util.getDebug('fdn:edit');

/**
 * Class handling feedinary edit.
 * Separating edit logic now allow for lazy loading later.
 */
export default class FeedinaryEdit {
  constructor(fdn) {
    // load edit on demand
    let src = fdn.config.src.replace('/fdn.', '/fdn-edit.');
    let that = this;

    this.fdn = fdn;
    debug('loading ' + src);

    if (!util.isAuthenticated()) {
      debug('exit edit mode: user is not authenticated');
      return;
    }

    debug('entered edit mode');
    let myDom = util.dom('.fdn-container:empty');

    myDom.html(fdn.config.emptyText);
    util.dom('.fdn-desc').addClass('fdn-edit');
    util.dom('[id^="fdn_"] > .fdn-desc').on('click', (evt) => {
      evt = evt || util.win.event;
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
  }

  /**
   * show editor
   * @param  {string} name the item name
   * @return {object}      self
   */
  editItem(name) {
    name = util.slugify(name).replace('fdn_', '');

    // get the content
    let item = (this.fdn.cache || {})[name] || {};

    if (!item.desc) {
      let el = util.dom(`[id='fdn_${name}']`);
      let descEl = util.dom(`[id='fdn_${name}'] .fdn-desc`);

      item.desc = descEl.html() || el.html();
    }

    this.fdn.edit = { name: name, item: item };

    // open edit modal
    debug('editing item ' + name);
    util.win.gmodal.show({ content: myContent, hideOn: 'click,esc,tap' });
    return this;
  }
}
