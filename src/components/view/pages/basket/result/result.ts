export default class Result {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.winners__container');

    const winnersTable = <HTMLElement>document.createElement('div');
    winnersTable.className = 'winners__table';

    const winnersTableHeader = <HTMLElement>document.createElement('div');
    winnersTableHeader.className = 'table__header';

    const headerNumber = <HTMLElement>document.createElement('div');
    headerNumber.className = 'table__header-item table__header_number';
    headerNumber.textContent = '№';

    const headerCar = <HTMLElement>document.createElement('div');
    headerCar.className = 'table__header-item table__header_car';
    headerCar.textContent = 'Car';

    const headerName = <HTMLElement>document.createElement('div');
    headerName.className = 'table__header-item table__header_name';
    headerName.textContent = 'Name';

    const headerWins = <HTMLElement>document.createElement('div');
    headerWins.className = 'table__header-item table__header_wins';
    headerWins.textContent = 'Wins';

    const headerWinsIcon = <HTMLElement>document.createElement('span');
    headerWinsIcon.className = 'table__header_wins-icon';

    headerWins.appendChild(headerWinsIcon);

    const headerTime = <HTMLElement>document.createElement('div');
    headerTime.className = 'table__header-item table__header_time';
    headerTime.textContent = 'Best time';

    const headerTimeIcon = <HTMLElement>document.createElement('span');
    headerTimeIcon.className = 'table__header_time-icon';

    headerTime.appendChild(headerTimeIcon);

    const winnersTableMain = <HTMLElement>document.createElement('div');
    winnersTableMain.className = 'table__main';

    winnersTableHeader.appendChild(headerNumber);
    winnersTableHeader.appendChild(headerCar);
    winnersTableHeader.appendChild(headerName);
    winnersTableHeader.appendChild(headerWins);
    winnersTableHeader.appendChild(headerTime);

    winnersTable.appendChild(winnersTableHeader);
    winnersTable.appendChild(winnersTableMain);

    container.appendChild(winnersTable);
  }
}
