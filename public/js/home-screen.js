class HomeScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._gotoMain = this._gotoMain.bind(this);
  }

  show() {
    this.containerElement.classList.remove('inactive');

    // add button
    var btn = document.querySelector('#start');
    btn.addEventListener('click', this._gotoMain);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _gotoMain(event) {
    document.dispatchEvent(new CustomEvent('goto-main'));
  }
}
