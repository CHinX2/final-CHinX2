class Concert {
    constructor(containerElement, idx, nextLog) {
      this.containerElement = containerElement;
      this.nextLog = nextLog;
      console.log(idx);

      this.id = idx;
      this.pElement = this._createPosterDOM(idx);
      this.logElement = this._createConcertDOM(idx);
      this.containerElement.append(this.pElement);
      this.containerElement.append(this.logElement);
    }

    _createPosterDOM(idx) {
      const pContainer = document.createElement('div');
      pContainer.classList.add('poster');
      pContainer.style.backgroundImage = "url('"+CONCERT_INFO[idx].poster+"')";
  
      return pContainer;
    }

    _createConcertDOM(idx) {
      const logContainer = document.createElement('div');
      logContainer.classList.add('info');
  
      const title = document.createElement('div');
      title.classList.add('concert-info');
      title.classList.add('title'); 
      title.textContent = CONCERT_INFO[idx].title;
  
      const atime = document.createElement('div');
      atime.classList.add('concert-info');
      atime.classList.add('atime');
      atime.textContent= CONCERT_INFO[idx].time;
  
      const comm = document.createElement('textarea');
      comm.classList.add('concert-info');
      comm.classList.add('comm');
      comm.textContent = "Text your comment here.";

      logContainer.appendChild(title);
      logContainer.appendChild(atime);
      logContainer.appendChild(comm);
      return logContainer;
    }
}