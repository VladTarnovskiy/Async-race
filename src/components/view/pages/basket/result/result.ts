export default class Result {
  draw(): void {
    const container = <HTMLElement>document.querySelector('.winners__container');

    const winnersTable = <HTMLElement>document.createElement('div');
    winnersTable.className = 'winners__table';

    const winnersTableHeader = <HTMLElement>document.createElement('div');
    winnersTableHeader.className = 'table__header';

    const headerNumber = <HTMLElement>document.createElement('div');
    headerNumber.className = 'table__header-item table__header_number';
    headerNumber.textContent = 'Number';

    const headerCar = <HTMLElement>document.createElement('div');
    headerCar.className = 'table__header-item table__header_car';
    headerCar.textContent = 'Car';

    const headerName = <HTMLElement>document.createElement('div');
    headerName.className = 'table__header-item table__header_name';
    headerName.textContent = 'Name';

    const headerWins = <HTMLElement>document.createElement('div');
    headerWins.className = 'table__header-item table__header_wins';
    headerWins.textContent = 'Wins';

    const headerTime = <HTMLElement>document.createElement('div');
    headerTime.className = 'table__header-item table__header_time';
    headerTime.textContent = 'Best time (sec)';

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
