const listContainer = document.getElementById('list');

const getVagas = () => {
  return JSON.parse(localStorage.getItem('vagas'));
};

const vagas = getVagas();

const loadVagas = () => {
  vagas.forEach((vaga, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    const avatarIcon = document.createElement('i');
    avatarIcon.classList.add('fa-solid', 'fa-circle-user', 'fa-3x');
    avatar.appendChild(avatarIcon);

    const info = document.createElement('div');
    info.classList.add('info');

    const titleDiv = document.createElement('div');
    const title = document.createElement('h3');
    const status = vaga.status === 'get' ? 'precisa de' : 'está dando';
    title.innerText = `${vaga.nomeUsuario} ${status} carona`;
    titleDiv.appendChild(title);

    const spacesDiv = document.createElement('div');
    const spaces = document.createElement('h4');
    const plural = parseInt(vaga.valor) > 1;
    const availableText = ` disponíve${plural ? 'is' : 'l'}`;
    spaces.innerText = `${vaga.valor} vaga${plural ? 's' : ''}${
      vaga.status === 'give' ? availableText : ''
    }`;
    spacesDiv.appendChild(spaces);

    info.appendChild(titleDiv);
    info.appendChild(spacesDiv);

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details-btn');
    detailsBtn.innerText = 'Ver vaga';
    detailsBtn.setAttribute('onclick', `openModal(${index})`);

    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(detailsBtn);

    listContainer.appendChild(card);
  });
};

// abre um modal mostrando detalhes da vaga
const openModal = index => {
  const vaga = vagas[index];
};
