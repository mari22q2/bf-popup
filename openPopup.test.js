class Element {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.style = {};
    this.attributes = {};
    this.eventListeners = {};
    this.parentNode = null;
    this.onclick = null;
    this.innerText = '';
  }
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
    child.parentNode = null;
  }
  remove() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }
  set id(val) { this.attributes.id = val; }
  get id() { return this.attributes.id; }
  set className(val) { this.attributes.className = val; }
  get className() { return this.attributes.className || ''; }
  addEventListener(evt, handler) { this.eventListeners[evt] = handler; }
  dispatchEvent(evt) {
    const handler = this.eventListeners[evt.type];
    if (handler) handler(evt);
  }
  click() {
    if (typeof this.onclick === 'function') {
      this.onclick({ target: this });
    }
    this.dispatchEvent({ type: 'click', target: this });
  }
  querySelector(selector) {
    for (const child of this.children) {
      if (selector.startsWith('.')) {
        if (child.className === selector.slice(1)) return child;
      } else if (selector.startsWith('#')) {
        if (child.id === selector.slice(1)) return child;
      } else if (child.tagName.toLowerCase() === selector.toLowerCase()) {
        return child;
      }
      const found = child.querySelector(selector);
      if (found) return found;
    }
    return null;
  }
  getElementById(id) {
    if (this.id === id) return this;
    for (const child of this.children) {
      const found = child.getElementById(id);
      if (found) return found;
    }
    return null;
  }
}

const document = {
  head: new Element('head'),
  body: new Element('body'),
  eventListeners: {},
  createElement(tag) { return new Element(tag); },
  querySelector(selector) {
    return this.head.querySelector(selector) || this.body.querySelector(selector);
  },
  getElementById(id) {
    return this.head.getElementById(id) || this.body.getElementById(id);
  },
  addEventListener(evt, handler) { this.eventListeners[evt] = handler; },
  removeEventListener(evt, handler) {
    if (this.eventListeners[evt] === handler) {
      delete this.eventListeners[evt];
    }
  },
  dispatchEvent(evt) {
    const handler = this.eventListeners[evt.type];
    if (handler) handler(evt);
  }
};

global.document = document;

global.window = { document };

global.requestAnimationFrame = (cb) => cb();

require('./openPopup.js');

function openAndClose() {
  window.openPopup('about:blank');
  const styleTag = document.getElementById('popup-spinner-style');
  if (!styleTag) {
    throw new Error('Style tag was not created');
  }
  const overlay = document.querySelector('.popup-overlay');
  if (!overlay) {
    throw new Error('Overlay not created');
  }
  const preloader = overlay.children[overlay.children.length - 1];
  if (preloader.style.animation !== 'spin 1s linear infinite') {
    throw new Error('Preloader animation missing');
  }

  document.dispatchEvent({ type: 'keydown', key: 'Escape' });

  if (document.getElementById('popup-spinner-style')) {
    throw new Error('Style tag not removed');
  }
  if (document.querySelector('.popup-overlay')) {
    throw new Error('Overlay not removed');
  }
  if (document.eventListeners.keydown) {
    throw new Error('Keydown listener not removed');
  }
}

openAndClose();
openAndClose();

console.log('All tests passed');
