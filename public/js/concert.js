// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Concert {
    constructor(containerElement, idx, nextLog) {
      this.containerElement = containerElement;
      console.log(idx);

      this.id = idx;
      this.pElement = this._createPosterDOM(idx);
      this.logElement = this._createConcertDOM(idx);
      this.containerElement.append(this.pElement);
      this.containerElement.append(this.logElement);
      //document.querySelector('title').textContent = CONCERT_INFO[idx].title;
      //document.querySelector('time').textContent = CONCERT_INFO[idx].time;
      //document.getElementById("poster").style.backgroundImage = "url('"+CONCERT_INFO[idx].poster+"')";
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
  
      logContainer.appendChild(title);
      logContainer.appendChild(atime);
      return logContainer;
    }
}