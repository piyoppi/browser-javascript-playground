import { buttonStyle } from './buttonStyle.js';

// ------------------------------------------------------------
// Shadow DOMを使わない場合の実装
// ------------------------------------------------------------
class MyButtonWithLight extends HTMLElement {
  constructor() {
    super();
    const content = this.innerHTML;
    this.innerHTML = '';

    this._internals = this.attachInternals();
    
    const button = document.createElement('button');
    this.appendChild(button);

    const style = document.createElement('style');
    style.textContent = buttonStyle;
    this.appendChild(style);

    button.innerHTML = content;
  }
}

customElements.define('my-button-with-light', MyButtonWithLight);

// ------------------------------------------------------------
// Shadow DOMを使う場合の実装
// ------------------------------------------------------------
class MyButtonWithShadow extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    
    const shadow = this.attachShadow({mode: 'open'});
    const button = document.createElement('button');
    shadow.appendChild(button);

    const style = document.createElement('style');
    style.textContent = buttonStyle;
    shadow.appendChild(style);

    button.addEventListener('click', () => {
      this._internals.form.requestSubmit();
    })

    button.innerHTML = '<slot></slot>';
  }
}

customElements.define('my-button-with-shadow', MyButtonWithShadow);

// ------------------------------------------------------------
// Shadow DOMを使い、Enterキーでsubmitする場合の実装
// ------------------------------------------------------------
class MyButtonWithShadowAndHandleEnter extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    
    const shadow = this.attachShadow({mode: 'open'});
    const button = document.createElement('button');
    shadow.appendChild(button);

    const style = document.createElement('style');
    style.textContent = buttonStyle;
    shadow.appendChild(style);

    button.addEventListener('click', () => {
      this._internals.form.requestSubmit();
    })

    button.innerHTML = '<slot></slot>';
  }

  connectedCallback() {
    this._internals.form.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this._internals.form.requestSubmit();
      }
    });
  }
}

customElements.define('my-button-with-shadow-handle-enter', MyButtonWithShadowAndHandleEnter);
