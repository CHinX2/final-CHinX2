class LogScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._gotoHome = this._gotoHome.bind(this);
    this.nextLog = this.nextLog.bind(this);
  }

  show(id, keylist, vallist) {
    this.containerElement.classList.remove('inactive');
    this.logContainer = document.querySelector('#log-container');

    while(this.logContainer.hasChildNodes()) {
      this.logContainer.removeChild(this.logContainer.firstChild);
    }
    

    this.selected = 0;
    this.right = 0;
    this.wrong = 0;
    this.last = null;
    this.last_val = 0;
    this.incorrectTab = [];
    this.id = id;
    document.querySelector('.correct').textContent = this.right;
    document.querySelector('.incorrect').textContent = this.wrong;

    //this.nkey = Object.keys(FLASHCARD_DECKS[i]['words']);
    //this.nval = FLASHCARD_DECKS[i]['words'];
    this.nkey = keylist;
    this.nval = vallist;
    this.cnt = this.nkey.length;
    
    const concert = new Concert(this.logContainer, this.nkey[0], this.nval[this.nkey[0]], this.nextLog);
    document.addEventListener('card-ans', this._gotoHome);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  nextLog() {
    //console.log('now:'+this.selected+' '+this.right+' '+this.wrong);
    if(this.selected < (this.right + this.wrong) && (this.selected+1) !== this.cnt) { 
      this.selected = this.right + this.wrong;
      const concert = new Concert(this.flashcardContainer, this.nkey[this.selected], this.nval[this.nkey[this.selected]], this.nextCard );
    }
  }

  _gotoHome(event) {
    document.dispatchEvent(new CustomEvent('goto-home'));
  }
}
