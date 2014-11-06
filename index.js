
/**
 * Module dependencies.
 */

var debug = require('debug')('temporarily-insert');

/**
 * Expose `temporarily`.
 */

module.exports = temporarily;

/**
 * Temporarily add `el` to the document,
 * run `fn(el)`, then remove it from the
 * document.
 *
 * Useful for calculating offsets for
 * content before displaying it.
 *
 * @param {HTMLElement} el
 * @param {Function} fn
 * @api private
 */

function temporarily(el, fn) {
  var parent = el.parentNode;
  var next = el.nextSibling;
  var name = el.nodeName.toLowerCase();
  // create tmp container
  var tmp = document.createElement('div');
  tmp.style.visibility = 'hidden';
  document.body.appendChild(tmp);
  debug('adding <%s> to temporary div', name);
  tmp.appendChild(el);
  fn(el);
  // add el back
  if (parent) {
    debug('adding <%s> back to its container', name);
    if (next) {
      parent.insertBefore(el, next);
    } else {
      parent.appendChild(el);
    }
  }
  // remove tmp container
  document.body.removeChild(tmp);
}
