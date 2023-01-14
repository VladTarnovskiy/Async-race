class Result {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.main');
    container.id = 'basket';

    const basketResult = <HTMLElement>document.querySelector('.basket__result');

    const basketTitle = <HTMLElement>document.createElement('div');
    basketTitle.className = 'result__title';
    basketTitle.textContent = 'Summary';

    const amountProd = <HTMLElement>document.createElement('div');
    amountProd.className = 'result__amount';
    amountProd.textContent = 'Products: ';

    const amountProdCounter = <HTMLElement>document.createElement('span');
    amountProdCounter.className = 'result__counter';
    amountProdCounter.textContent = '0';
    amountProd.appendChild(amountProdCounter);

    const totalPrice = <HTMLElement>document.createElement('div');
    totalPrice.className = 'result__price';
    totalPrice.textContent = 'Total: ';

    const totalPriceCounter = <HTMLElement>document.createElement('span');
    totalPriceCounter.className = 'result__price-counter';
    totalPriceCounter.textContent = '0 $';
    totalPrice.appendChild(totalPriceCounter);

    const totalPriceWhithPromo = <HTMLElement>document.createElement('div');
    totalPriceWhithPromo.className = 'result__price_promo';
    totalPriceWhithPromo.textContent = 'Total: ';

    const totalPricePercentPromo = <HTMLElement>document.createElement('div');
    totalPricePercentPromo.className = 'result__percent_promo';

    const totalPriceWhithPromoCounter = <HTMLElement>document.createElement('span');
    totalPriceWhithPromoCounter.className = 'result__price-counter_promo';
    totalPriceWhithPromoCounter.textContent = '0 $';
    totalPriceWhithPromo.appendChild(totalPriceWhithPromoCounter);
    totalPrice.appendChild(totalPriceWhithPromo);
    totalPrice.appendChild(totalPricePercentPromo);

    const promocodeInput = <HTMLElement>document.createElement('input');
    promocodeInput.className = 'result__promo';
    promocodeInput.setAttribute('type', 'search');
    promocodeInput.setAttribute('placeholder', 'Enter promo code');

    const promoHint = <HTMLElement>document.createElement('div');
    promoHint.className = 'result__promo-hint';
    promoHint.textContent = "Promo (-10% every): 'RS', 'RSSchool'";

    const resultButton = <HTMLElement>document.createElement('button');
    resultButton.className = 'button_buy';
    resultButton.textContent = 'Place order';

    basketResult.appendChild(basketTitle);
    basketResult.appendChild(amountProd);
    basketResult.appendChild(totalPrice);
    basketResult.appendChild(promocodeInput);
    basketResult.appendChild(promoHint);
    basketResult.appendChild(resultButton);
  }
}
export default Result;
