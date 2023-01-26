class Footer {
  draw(): void {
    const footer = <HTMLElement>document.querySelector('footer');

    const list = <HTMLElement>document.createElement('ul');
    list.className = 'footer__list';

    const listOne = <HTMLElement>document.createElement('li');
    const linkGit = <HTMLElement>document.createElement('a');
    linkGit.setAttribute('href', 'https://github.com/VladTarnovskiy');
    linkGit.className = 'footer__git-logo';
    listOne.appendChild(linkGit);

    const listTwo = <HTMLElement>document.createElement('li');
    listTwo.className = 'footer__date';
    listTwo.textContent = '©2022';

    const listThree = <HTMLElement>document.createElement('li');
    const linkSchool = <HTMLElement>document.createElement('a');
    linkSchool.setAttribute('href', 'https://rs.school/index.html');
    linkSchool.className = 'footer__rs-logo';
    listThree.appendChild(linkSchool);

    list.appendChild(listOne);
    list.appendChild(listTwo);
    list.appendChild(listThree);

    footer.appendChild(list);
  }
}

export default Footer;
