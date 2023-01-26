class Header {
  draw(): void {
    const header = <HTMLElement>document.querySelector('.header');

    const headerTitlewrap = <HTMLElement>document.createElement('div');
    headerTitlewrap.className = 'header__title-wrap';

    const buttonContainer = <HTMLElement>document.createElement('div');
    buttonContainer.className = 'but_container';

    const buttonGarage = <HTMLElement>document.createElement('a');
    buttonGarage.className = 'button but_link but_garage';
    buttonGarage.textContent = 'To garage';
    buttonGarage.setAttribute('href', '#?');

    const buttonGarageIcon = <HTMLElement>document.createElement('span');
    buttonGarageIcon.className = 'but_garage-icon';

    buttonGarage.appendChild(buttonGarageIcon);

    const buttonWinners = <HTMLElement>document.createElement('a');
    buttonWinners.className = 'button but_link but_winners';
    buttonWinners.textContent = 'To winners';
    buttonWinners.setAttribute('href', '#winners-page?');

    const buttonWinnersIcon = <HTMLElement>document.createElement('span');
    buttonWinnersIcon.className = 'but_winners-icon';

    buttonWinners.appendChild(buttonWinnersIcon);

    buttonContainer.appendChild(buttonGarage);
    buttonContainer.appendChild(buttonWinners);

    const headerLogo = <HTMLElement>document.createElement('a');
    headerLogo.setAttribute('href', '#?');
    headerLogo.className = 'header__logo';

    const imgLogo = <HTMLElement>document.createElement('div');
    imgLogo.className = 'header__logo-img';
    imgLogo.setAttribute('href', '#main-page');

    const headerTitle = <HTMLElement>document.createElement('h1');
    headerTitle.className = 'header__title';
    headerTitle.textContent = 'Async-Race';

    headerLogo.appendChild(imgLogo);
    headerTitlewrap.appendChild(headerLogo);
    headerTitlewrap.appendChild(headerTitle);
    header.appendChild(buttonContainer);
    header.appendChild(headerTitlewrap);
  }
}
export default Header;
