class LogScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._gotoHome = this._gotoHome.bind(this);
    this.nextLog = this.nextLog.bind(this);
    this._lclick = this._lclick.bind(this);
    this._rclick = this._rclick.bind(this);
  }

  show(now) {
    this.containerElement.classList.remove('inactive');
    this.logContainer = document.querySelector('#log-container');
    this.now = now;
    this.next = now;
    this.larrow = document.querySelector('#l-arrow');
    this.rarrow = document.querySelector('#r-arrow');

    while(this.logContainer.hasChildNodes()) {
      this.logContainer.removeChild(this.logContainer.firstChild);
    }

    // add button
    this.larrow.addEventListener('click', this._lclick);
    this.rarrow.addEventListener('click', this._rclick);
    
    const concert = new Concert(this.logContainer, this.now, this.nextLog);
    document.addEventListener('card-ans', this._gotoHome);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  nextLog() {
    //console.log('now:'+this.selected+' '+this.right+' '+this.wrong);
    if(this.next !== this.now) { 
      this.now = this.next;
      const concert = new Concert(this.logContainer, this.now, this.nextLog );
    }
  }

  _lclick(event) {
    if(this.now === 0) this.next = 10;
    else this.next = this.now - 1;
  }

  _rclick(event) {
    if(this.now === 10) this.next = 0;
    else this.next = this.now + 1;
  }

  _gotoHome(event) {
    document.dispatchEvent(new CustomEvent('goto-home'));
  }
}
