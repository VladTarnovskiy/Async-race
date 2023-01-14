import AppView from '../view/appView';
import { Model } from '../model/model';
import { PageIds } from '../types/types';

class AppController extends Model {
  view: AppView;

  constructor() {
    super();
    this.view = new AppView();
  }

  // start routing
  renderNewPage(idPage: string): void {
    const currentPageHTML = <HTMLElement>document.querySelector('body');
    currentPageHTML.replaceChildren();
    if (idPage === PageIds.GaragePage || idPage === '') {
      this.view.drawMain()
    } else if (idPage === PageIds.WinnersPage) {
      this.view.drawBasket();
    } else {
      this.view.drawError();
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.split('?')[0];
        this.renderNewPage(hash);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.split('?')[0];
      this.renderNewPage(hash);
    });
  }
  //endrouting


  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default AppController;
