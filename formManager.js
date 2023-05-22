export default class FormManager {
  constructor(formSelector, worldInstance) {
    this.form = this.getDOMElementBySelector(formSelector);
    this.numericContainer = this.createElement('numeric-container');
    this.selectContainer = this.createElement('select-container');

    this.form.append(this.numericContainer, this.selectContainer);

    this.worldInstance = worldInstance;

    const button = this.createButton('Настройки', 'hidden', () => {
      this.form.classList.toggle('active');
      button.classList.toggle('hidden');
    });

    this.form.insertAdjacentElement('beforebegin', button);
  }

  getDOMElementBySelector(selector) {
    return document.querySelector(selector);
  }

  createElement(className, tag = 'div') {
    const element = document.createElement(tag);
    element.className = className;

    return element;
  }

  createNumericInput(startValue, description, option, minValue, maxValue) {
    const {label, text, input} = this.createInput(startValue, description, 'number', 'numeric');

    this.createListener(label, 'input', target => {
      const value = +target.value;
      if (!value || value > maxValue || value < minValue) {
        text.style.color = '#ED2939';
        input.style.color = '#ED2939';
        return;
      }
      text.style.color = '#fff';
      input.style.color = '#fff';

      this.worldInstance.restartLife({[option]: value});
    });

    this.numericContainer.appendChild(label);
  }

  createCheckbox(isChecked, description, option) {
    const {label} = this.createInput(isChecked, description, 'checkbox', 'container');

    this.createListener(label, 'change', target => {
      this.worldInstance.restartLife({[option]: target.checked});
    });

    this.selectContainer.appendChild(label);
  }

  createMusicCheckbox(isChecked, description, path) {
    const {label} = this.createInput(isChecked, description, 'checkbox', 'container');
    const audio = new Audio(path);

    this.createListener(label, 'change', target => {
      if (target.checked) {
        audio.play();
        audio.loop = true;
      } else {
        audio.pause();
      }
    });

    this.selectContainer.appendChild(label);
  }

  createColor(startValue, description, option) {
    const {label} = this.createInput(startValue, description, 'color', 'color-label');

    this.createListener(label, 'change', target => {
      this.worldInstance.restartLife({[option]: target.value});
    });

    this.selectContainer.appendChild(label);
  }

  createInput(startValue, description, type, labelClassName) {
    const label = this.createElement(`${type}-label ${labelClassName}`, 'label');
    const text = this.createElement(`${type}-text`);
    const input = this.createElement(`${type}-input`, 'input');
    const span = type === 'checkbox' ? this.createElement('checkmark', 'span') : '';

    if (type === 'checkbox') {
      input.checked = startValue;
    } else {
      input.value = startValue;
    }
    input.type = type;
    text.textContent = description;

    label.append(text, input, span);

    return {label, text, input};
  }

  createButton(text, className, onClick) {
    const button = this.createElement(className, 'button');
    button.textContent = text;

    onClick && this.createListener(button, 'click', onClick);

    return button;
  }

  createListener(element, type, execFn) {
    element.addEventListener(type, e => {
      execFn(e.target);
    })
  }
}