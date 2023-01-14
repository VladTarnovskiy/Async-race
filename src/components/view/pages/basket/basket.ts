import Result from './result/result';
import PageGrid from '../../grid/page-grid';
import Header from '../../header/header';
import Footer from '../../footer/footer';

class BasketView {
  result: Result;
  PageGrid: PageGrid;
  header: Header;
  footer: Footer;

  constructor() {
    this.result = new Result();
    this.PageGrid = new PageGrid();
    this.header = new Header();
    this.footer = new Footer();
  }

  basketGridContainer() {
    const basketProd = <HTMLElement>document.createElement('div');
    basketProd.className = 'basket__prod';

    const basketProdHeaderContainer = <HTMLElement>document.createElement('div');
    basketProdHeaderContainer.className = 'basket__head-container';

    const basketProdTille = <HTMLElement>document.createElement('div');
    basketProdTille.className = 'basket__prod-title';
    basketProdTille.textContent = 'Products in cart';

    basketProdHeaderContainer.appendChild(basketProdTille);
    //pagination
    const paginationContainer = <HTMLElement>document.createElement('div');
    paginationContainer.className = 'pagination__container';

    const paginationLimitContainer = <HTMLElement>document.createElement('div');
    paginationLimitContainer.className = 'pagination-limit__container';

    const paginationLimitTitle = <HTMLElement>document.createElement('div');
    paginationLimitTitle.className = 'pagination-limit__title';
    paginationLimitTitle.textContent = 'Limit: ';

    const paginationLimitValue = <HTMLElement>document.createElement('input');
    paginationLimitValue.className = 'pagination-limit__value';
    paginationLimitValue.setAttribute('type', 'number');
    paginationLimitValue.setAttribute('value', '1');
    paginationLimitValue.setAttribute('min', '1');

    paginationLimitContainer.appendChild(paginationLimitTitle);
    paginationLimitContainer.appendChild(paginationLimitValue);

    //page block

    const paginationPageContainer = <HTMLElement>document.createElement('div');
    paginationPageContainer.className = 'pagination-page__container';

    const paginationPageTitle = <HTMLElement>document.createElement('div');
    paginationPageTitle.className = 'pagination-page__title';
    paginationPageTitle.textContent = 'Page: ';

    const paginationPageControl = <HTMLElement>document.createElement('div');
    paginationPageControl.className = 'pagination-page__control';

    const paginationPageControlLeft = <HTMLElement>document.createElement('button');
    paginationPageControlLeft.className = 'pagination-page__control-but pagination-page__control-left';
    paginationPageControlLeft.textContent = '<';

    const paginationPageControlRight = <HTMLElement>document.createElement('button');
    paginationPageControlRight.className = 'pagination-page__control-but pagination-page__control-right';
    paginationPageControlRight.textContent = '>';

    const paginationPageCounter = <HTMLElement>document.createElement('div');
    paginationPageCounter.className = 'pagination-page__counter';
    paginationPageCounter.textContent = '1';

    paginationPageControl.appendChild(paginationPageControlLeft);
    paginationPageControl.appendChild(paginationPageCounter);
    paginationPageControl.appendChild(paginationPageControlRight);

    paginationPageContainer.appendChild(paginationPageTitle);
    paginationPageContainer.appendChild(paginationPageControl);

    paginationContainer.appendChild(paginationLimitContainer);
    paginationContainer.appendChild(paginationPageContainer);

    basketProdHeaderContainer.appendChild(paginationContainer);
    //pagination
    const basketProdContainer = <HTMLElement>document.createElement('div');
    basketProdContainer.className = 'basket__prod-container';

    basketProd.appendChild(basketProdHeaderContainer);
    basketProd.appendChild(basketProdContainer);

    const basketSummary = <HTMLElement>document.createElement('aside');
    basketSummary.className = 'basket__result';

    const main = <HTMLElement>document.querySelector('main');
    main.appendChild(basketProd);
    main.appendChild(basketSummary);
  }

  draw(): void {
    this.PageGrid.draw();
    this.header.draw();
    this.basketGridContainer();
    this.result.draw();
    this.footer.draw();
  }
}

export default BasketView;
