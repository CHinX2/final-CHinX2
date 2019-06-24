class App {
  constructor() {
    const homeElement = document.querySelector('#home');
    this.home = new HomeScreen(homeElement);
    
    const mainElement = document.querySelector('#main');
    this.logs = new LogScreen(mainElement);

    this.home.show();

    this.goToMain = this.goToMain.bind(this);
    this.goToHome = this.goToHome.bind(this);

    document.addEventListener('goto-main', this.goToMain);
    document.addEventListener('goto-home', this.goToHome);
    

  }

  goToMain(event) {
    this.home.hide();
    this.logs.show(1);
  }

  goToHome(event) {
    this.logs.hide();
    this.home.show();
  }
}
