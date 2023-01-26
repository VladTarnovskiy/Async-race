class Error {
  draw(): void {
    const body = <HTMLElement>document.querySelector('body');
    body.replaceChildren();

    const wrapper = <HTMLElement>document.createElement('div');
    wrapper.className = 'error_wrapper';

    const errorCode = <HTMLElement>document.createElement('div');
    errorCode.className = 'error_code';
    errorCode.textContent = '404';

    const errorDescript = <HTMLElement>document.createElement('div');
    errorDescript.className = 'error_descript';
    errorDescript.textContent = 'The page you are looking for not avaible!';

    const errorAnimation = <HTMLElement>document.createElement('div');
    errorAnimation.className = 'error_animation';

    body.appendChild(wrapper);
    wrapper.appendChild(errorCode);
    wrapper.appendChild(errorDescript);
    wrapper.appendChild(errorAnimation);
  }
}
export default Error;
