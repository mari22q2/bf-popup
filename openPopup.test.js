const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

// Minimal DOM stubs
const document = {
  _overlay: null,
  body: {
    style: { overflow: '' },
    appendChild(el) {
      el.parentNode = this;
      if (el.className === 'popup-overlay') {
        document._overlay = el;
      }
    },
    removeChild(el) {
      if (el.className === 'popup-overlay') {
        document._overlay = null;
      }
    }
  },
  head: {
    appendChild() {}
  },
  createElement(tag) {
    return {
      tagName: tag.toUpperCase(),
      className: '',
      style: {},
      childNodes: [],
      appendChild(child) {
        child.parentNode = this;
        this.childNodes.push(child);
      },
      addEventListener(type, handler) {
        this._listeners = this._listeners || {};
        this._listeners[type] = handler;
      },
      dispatchEvent(event) {
        if (this._listeners && this._listeners[event.type]) {
          this._listeners[event.type](event);
        }
      },
      set textContent(value) {
        this._text = value;
      },
      get textContent() {
        return this._text;
      }
    };
  },
  querySelector(selector) {
    if (selector === '.popup-overlay') {
      return this._overlay;
    }
    return null;
  }
};

const window = {
  document,
  requestAnimationFrame: (cb) => cb()
};

global.window = window;
global.document = document;
global.requestAnimationFrame = window.requestAnimationFrame;

// Load openPopup script
const script = fs.readFileSync('./openPopup.js', 'utf-8');
vm.runInThisContext(script);

// Initial overflow should be empty
assert.strictEqual(document.body.style.overflow, '');

// Open popup
window.openPopup('about:blank');
assert.strictEqual(document.body.style.overflow, 'hidden');

// Close popup via close button
const overlay = document._overlay;
const popup = overlay.childNodes[0];
const closeBtn = popup.childNodes[0];
closeBtn.onclick();
assert.strictEqual(document.body.style.overflow, '');

// Open again and close by clicking overlay
window.openPopup('about:blank');
assert.strictEqual(document.body.style.overflow, 'hidden');
document._overlay.dispatchEvent({ type: 'click', target: document._overlay });
assert.strictEqual(document.body.style.overflow, '');

console.log('All tests passed.');
