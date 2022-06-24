function setVagas(vagas) {
  localStorage.setItem('vagas', JSON.stringify(vagas));
}

function getVagas() {
  return JSON.parse(localStorage.getItem('vagas'));
}

function carregaVagas() {
  const vagas = getVagas();
  if (!vagas) return;

  const list = document.querySelector('.list');
  list.innerHTML = null;

  vagas.forEach((vaga, index) => {
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    const infoHTML = `
      <div>
        <div class="icon">
          <i class="fa-regular fa-calendar"></i>
        </div>
        <span>segunda-feira</span>
      </div>
      <div>
        <div class="icon">
          <i class="fa-regular fa-clock"></i>
        </div>
        <span>22:30</span>
      </div>
      <div>
        <div class="icon">
          <i class="fa-regular fa-building"></i>
        </div>
        <span>PUC Praça da Liberdade</span>
      </div>
      <div>
        <div class="icon">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <span>Ruas dos Bobos, 0, Lindeza</span>
      </div>`;
    info.insertAdjacentHTML('afterbegin', infoHTML);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    actions.innerHTML = `
      <button class="icon-btn edit-icon" title="Editar">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon-btn delete-icon" title="Apagar">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;

    item.appendChild(info);
    item.appendChild(actions);

    list.appendChild(item);
  });
}

function handleEditarVaga(index) {
  location.href = `form-rota.html?editar=${index}`;
}

function calcular(val) {
  var valor = $('#quantVagas').val();
  if (valor - val !== 0 && valor - val !== 15) {
    $('#quantVagas').val(valor - val);
  }
}

function anunciarVaga() {
  let titulo = $('#tVaga').val();
  let saida = $('#endSaida').val();
  let destino = $('#endDestino').val();
  let desc = $('#Desc').val();
  var valor = $('#quantVagas').val();

  if (!titulo || !saida || !destino || !valor) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  alert(
    'Título da Vaga: ' +
      titulo +
      ' Endereço de saída: ' +
      saida +
      ' Endereço de destino: ' +
      destino +
      ' Descrição:' +
      desc +
      ' Quantidade de vagas: ' +
      valor
  );

  let vagas = getVagas();
  if (!vagas) vagas = [];
  vagas.push({
    titulo,
    saida,
    destino,
    desc,
    valor,
  });
  setVagas(vagas);
  location.href = 'caronas.html';
}

function deletarVaga(index) {
  let vagas = getVagas();
  vagas.splice(index, 1);
  setVagas(vagas);
  carregaVagas();
}
