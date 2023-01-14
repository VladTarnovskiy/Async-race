import PageGrid from '../../grid/page-grid';
// import Products from './products/products';
import Console from './console/console';
import Header from '../../header/header';
import Footer from '../../footer/footer';

export class Main {
  // products: Products;
  console: Console;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;

  constructor() {
    // this.products = new Products();
    this.console = new Console();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  mainGridContainer() {
    const consoleSection = <HTMLElement>document.createElement('div');
    consoleSection.className = 'console';

    const garageSection = <HTMLElement>document.createElement('div');
    garageSection.className = 'garage';

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(consoleSection);
    main.appendChild(garageSection);
  }

  draw(): void {
    this.PageGrid.draw();
    this.mainGridContainer();
    this.header.draw();
    this.footer.draw();
    // this.products.draw();
    this.console.draw();
  }
}

export default Main;
