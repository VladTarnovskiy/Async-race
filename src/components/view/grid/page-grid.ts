class PageGrid {
  draw(): void {
    const body = <HTMLElement>document.querySelector('body');

    const wrapper = <HTMLElement>document.createElement('div');
    wrapper.className = 'wrapper';

    const header = <HTMLElement>document.createElement('header');
    header.className = 'header';

    const main = <HTMLElement>document.createElement('main');
    main.className = 'main';

    const footer = <HTMLElement>document.createElement('footer');
    footer.className = 'footer';

    body.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(main);
    wrapper.appendChild(footer);
  }
}
export default PageGrid;
