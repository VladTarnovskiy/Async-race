import Result from './result/result';
import CarWinner from './car-winner/car-winner';
import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';

export default class Winners {
  result: Result;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;
  carWinner: CarWinner;

  constructor() {
    this.result = new Result();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
    this.carWinner = new CarWinner();
  }

  winnersGrid() {
    const winnersSection = <HTMLElement>document.createElement('div');
    winnersSection.className = 'winners';

    const winnersTitle = <HTMLElement>document.createElement('div');
    winnersTitle.className = 'winners__title';
    winnersTitle.textContent = 'Winners (0)';

    const winnersPagination = <HTMLElement>document.createElement('div');
    winnersPagination.className = 'winners__pagination';
    winnersPagination.textContent = 'Page #1';
    winnersTitle.appendChild(winnersPagination);

    const winnersCars = <HTMLElement>document.createElement('div');
    winnersCars.className = 'winners__container';

    const winnersPages = <HTMLElement>document.createElement('div');
    winnersPages.className = 'pages';

    const buttonPrevPage = <HTMLElement>document.createElement('button');
    buttonPrevPage.className = 'button pages__but page__but_prev';
    buttonPrevPage.textContent = '< Prev';

    const buttonNextPage = <HTMLElement>document.createElement('button');
    buttonNextPage.className = 'button pages__but page__but_next';
    buttonNextPage.textContent = 'Next >';

    winnersPages.appendChild(buttonPrevPage);
    winnersPages.appendChild(buttonNextPage);

    winnersSection.appendChild(winnersTitle);
    winnersSection.appendChild(winnersCars);
    winnersSection.appendChild(winnersPages);

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(winnersSection);
  }

  draw(): void {
    this.PageGrid.draw();
    this.header.draw();
    this.footer.draw();
    this.winnersGrid();
    this.result.draw();
    this.carWinner.draw();
  }
}
