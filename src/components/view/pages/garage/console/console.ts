export default class Console {
  draw(): void {
    //color create
    const root = <HTMLElement>document.querySelector('.console');
    const colorWrapper = <HTMLElement>document.createElement('div');
    colorWrapper.className = 'color__wrapper';

    const colorItemCreate = <HTMLElement>document.createElement('form');
    colorItemCreate.className = 'color__item color__item_create';

    const brandDisplayCreate = <HTMLInputElement>document.createElement('input');
    brandDisplayCreate.setAttribute('type', 'search');
    brandDisplayCreate.required = true;
    brandDisplayCreate.className = 'input color__display brand__display_create';

    const colorInputCreate = <HTMLElement>document.createElement('input');
    colorInputCreate.className = 'color__input color__input_create';
    colorInputCreate.setAttribute('type', 'color');

    const colorButtonCreate = <HTMLElement>document.createElement('button');
    colorButtonCreate.className = 'button color__button color__button_create';
    colorButtonCreate.textContent = 'Create';

    colorItemCreate.appendChild(brandDisplayCreate);
    colorItemCreate.appendChild(colorInputCreate);
    colorItemCreate.appendChild(colorButtonCreate);

    //color update
    const colorItemUpdate = <HTMLElement>document.createElement('form');
    colorItemUpdate.className = 'color__item color__item_update';

    const colorDisplayUpdate = <HTMLInputElement>document.createElement('input');
    colorDisplayUpdate.setAttribute('type', 'search');
    colorDisplayUpdate.required = true;
    colorDisplayUpdate.className = 'input color__display brand__display_update';

    const colorInputUpdate = <HTMLElement>document.createElement('input');
    colorInputUpdate.className = 'color__input color__input_update';
    colorInputUpdate.setAttribute('type', 'color');

    const colorButtonUpdate = <HTMLElement>document.createElement('button');
    colorButtonUpdate.className = 'button color__button color__button_update';
    colorButtonUpdate.textContent = 'Update';

    colorItemUpdate.appendChild(colorDisplayUpdate);
    colorItemUpdate.appendChild(colorInputUpdate);
    colorItemUpdate.appendChild(colorButtonUpdate);

    //buttons
    const buttonWrap = <HTMLElement>document.createElement('div');
    buttonWrap.className = 'buttons';

    const buttonRace = <HTMLElement>document.createElement('div');
    buttonRace.className = 'button button_control button_race';
    buttonRace.textContent = 'Race';

    const butRaceIcon = <HTMLElement>document.createElement('span');
    butRaceIcon.className = 'button_race-icon';

    buttonRace.appendChild(butRaceIcon);

    const buttonReset = <HTMLElement>document.createElement('div');
    buttonReset.className = 'button button_control button_reset';
    buttonReset.textContent = 'Reset';

    const buttonGenerate = <HTMLElement>document.createElement('div');
    buttonGenerate.className = 'button button_control button_generate';
    buttonGenerate.textContent = 'Generate';

    buttonWrap.appendChild(buttonRace);
    buttonWrap.appendChild(buttonReset);
    buttonWrap.appendChild(buttonGenerate);

    colorWrapper.appendChild(colorItemCreate);
    colorWrapper.appendChild(colorItemUpdate);
    colorWrapper.appendChild(buttonWrap);

    root.appendChild(colorWrapper);
  }
}
