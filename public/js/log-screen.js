class LogScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._gotoHome = this._gotoHome.bind(this);
 
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
    const la = document.createElement('div');
    la.classList.add('arrow');
    la.style.backgroundImage = "url('./images/larrow.png')";
    this.larrow.addEventListener('click', this._lclick);
    this.larrow.append(la);
    
    const ra = document.createElement('div');
    ra.classList.add('arrow');
    ra.style.backgroundImage = "url('./images/rarrow.png')";
    this.rarrow.addEventListener('click', this._rclick);
    this.rarrow.append(ra);
    
    const concert = new Concert(this.logContainer, this.now);
    document.addEventListener('card-ans', this._gotoHome);
  }

  hide() {
    var list = document.querySelector('#l-arrow');
    while(list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    var list = document.querySelector('#r-arrow');
    while(list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    this.containerElement.classList.add('inactive');
  }

  nextLog() {
    //console.log('now:'+this.now+' '+this.next);
    if(this.next !== this.now) { 
      const concert = new Concert(this.logContainer, this.next, this.nextLog);
      this.now = this.next;
    }
  }

  _lclick(event) {
    //console.log('now:'+this.now+' '+this.next);
    if(this.now === 0) this.next = 10;
    else this.next = this.now - 1;
    while(this.logContainer.hasChildNodes()) {
      this.logContainer.removeChild(this.logContainer.firstChild);
    }
    this.nextLog();
    return;
  }

  _rclick(event) {
    //console.log('now:'+this.now+' '+this.next);
    if(this.now === 10) this.next = 0;
    else this.next = this.now + 1;
    while(this.logContainer.hasChildNodes()) {
      this.logContainer.removeChild(this.logContainer.firstChild);
    }
    this.nextLog();
  }

  _gotoHome(event) {
    
    document.dispatchEvent(new CustomEvent('goto-home'));
  }
}
