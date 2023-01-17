import PageGrid from '../../grid/page-grid';
// import Car from './car/car';
import Console from './console/console';
import Header from '../../header/header';
import Footer from '../../footer/footer';

export default class Garage {
  // car: Car;
  console: Console;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;

  constructor() {
    // this.car = new Car();
    this.console = new Console();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  garageGrid() {
    const consoleSection = <HTMLElement>document.createElement('div');
    consoleSection.className = 'console';

    const garageSection = <HTMLElement>document.createElement('div');
    garageSection.className = 'garage';

    const garageTitle = <HTMLElement>document.createElement('div');
    garageTitle.className = 'garage__title';

    const garageTotalCount = <HTMLElement>document.createElement('div');
    garageTotalCount.className = 'garage__total-count';
    garageTotalCount.textContent = 'Garage (0)';

    const garagePagination = <HTMLElement>document.createElement('div');
    garagePagination.className = 'garage__pagination';
    garagePagination.textContent = 'Page #1';
    garageTitle.appendChild(garageTotalCount);
    garageTitle.appendChild(garagePagination);

    const garageCars = <HTMLElement>document.createElement('div');
    garageCars.className = 'garage__cars';

    const garagePages = <HTMLElement>document.createElement('div');
    garagePages.className = 'pages';

    const buttonPrevPage = <HTMLElement>document.createElement('button');
    buttonPrevPage.className = 'button pages__but page__but_prev';
    buttonPrevPage.textContent = '< Prev';

    const buttonNextPage = <HTMLElement>document.createElement('button');
    buttonNextPage.className = 'button pages__but page__but_next';
    buttonNextPage.textContent = 'Next >';

    garagePages.appendChild(buttonPrevPage);
    garagePages.appendChild(buttonNextPage);

    garageSection.appendChild(garageTitle);
    garageSection.appendChild(garageCars);
    garageSection.appendChild(garagePages);

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(consoleSection);
    main.appendChild(garageSection);
  }

  draw(): void {
    this.PageGrid.draw();
    this.garageGrid();
    this.header.draw();
    this.footer.draw();
    // this.car.draw();
    this.console.draw();
  }
}
