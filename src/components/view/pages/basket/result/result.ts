export default class Result {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.winners__container');

    const winnersTable = <HTMLElement>document.createElement('div');
    winnersTable.className = 'winners__table';

    const winnersTableHeader = <HTMLElement>document.createElement('div');
    winnersTableHeader.className = 'table__header';

    const sortIndicator = <HTMLElement>document.createElement('span');
    sortIndicator.className = 'sort_indicator';
    sortIndicator.textContent = '↑';

    const headerNumber = <HTMLElement>document.createElement('div');
    headerNumber.className = 'table__header-item table__header_number table__header_sort';
    headerNumber.textContent = '№';
    headerNumber.appendChild(sortIndicator);

    const headerCar = <HTMLElement>document.createElement('div');
    headerCar.className = 'table__header-item table__header_car';
    headerCar.textContent = 'Car';

    const headerName = <HTMLElement>document.createElement('div');
    headerName.className = 'table__header-item table__header_name';
    headerName.textContent = 'Name';

    const headerWins = <HTMLElement>document.createElement('div');
    headerWins.className = 'table__header-item table__header_wins table__header_sort';
    headerWins.textContent = 'Wins';
    headerWins.appendChild(sortIndicator.cloneNode(true));

    const headerWinsIcon = <HTMLElement>document.createElement('span');
    headerWinsIcon.className = 'table__header_wins-icon';

    headerWins.appendChild(headerWinsIcon);

    const headerTime = <HTMLElement>document.createElement('div');
    headerTime.className = 'table__header-item table__header_time table__header_sort';
    headerTime.textContent = 'Best time';
    headerTime.appendChild(sortIndicator.cloneNode(true));

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
