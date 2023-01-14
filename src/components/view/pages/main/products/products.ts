class Products {
  draw(): void {
    const products = <HTMLElement>document.querySelector('.products');

    const sort = <HTMLElement>document.createElement('div');
    sort.className = 'sort';

    const prodContainer = <HTMLElement>document.createElement('div');
    prodContainer.className = 'product-items';

    products.appendChild(sort);
    products.appendChild(prodContainer);
  }
}
export default Products;
