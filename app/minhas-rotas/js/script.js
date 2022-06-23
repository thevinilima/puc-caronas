const caronasTable = document.querySelector('.caronas-table');
$unidadeInput = $('#unidade');
$ruaInput = $('#rua');
$numeroInput = $('#numero');
$bairroInput = $('#bairro');
$horarioInput = $('#horario');

// verifica se a operação em form-carona.html é de edição
function checkEdicao() {
  const queryString = location.search;
  if (!queryString) return;
  const params = new URLSearchParams(queryString);
  const index = params.get('editar');

  const caronas = getCaronas();
  let carona = caronas[index];
  console.log({ carona });
  $unidadeInput.val(carona.unidade);
  $ruaInput.val(carona.rua);
  $numeroInput.val(carona.numero);
  $bairroInput.val(carona.bairro);
  $horarioInput.val(carona.horario);
  $radios = $('input[name="dia"]');
  if (!$radios.is(':checked')) {
    $radios.filter(`[value='${carona.diaSemana}']`).prop('checked', true);
  }
  $botaoAcao = $('#botao-acao');
  $botaoAcao.attr('onclick', `editarCarona(${index})`);
  $botaoAcao.html('Salvar');
  $('#titulo').html('Editar Rota');
}

// retorna as caronas no localStorage
function getCaronas() {
  return JSON.parse(localStorage.getItem('caronas'));
}

// seta as caronas no localStorage
function setCaronas(caronas) {
  localStorage.setItem('caronas', JSON.stringify(caronas));
}

// carrega lista de caronas dinamicamente
function loadCaronas() {
  caronasTable.innerHTML = null;
  let caronas = getCaronas();
  for (let i = 0; i < caronas.length; i++) {
    let blocoInfo = document.createElement('div');
    blocoInfo.classList.add('blocoinfo');

    let titulo = document.createElement('h4');
    titulo.classList.add('sub');
    let spanDia = document.createElement('span');
    spanDia.innerHTML = caronas[i].diaSemana + ' ';
    let spanHorario = document.createElement('span');
    spanHorario.innerHTML = caronas[i].horario;
    let buttonEditar = document.createElement('button');
    buttonEditar.classList.add('acao');
    buttonEditar.setAttribute('onclick', `handleEditarCarona(${i})`);
    let iconEditar = document.createElement('i');
    iconEditar.classList.add('fa-regular');
    iconEditar.classList.add('fa-edit');
    buttonEditar.appendChild(iconEditar);
    let buttonDeletar = document.createElement('button');
    buttonDeletar.classList.add('acao');
    buttonDeletar.setAttribute('onclick', `deletarCarona(${i})`);
    let iconDeletar = document.createElement('i');
    iconDeletar.classList.add('fa-regular');
    iconDeletar.classList.add('fa-circle-xmark');
    buttonDeletar.appendChild(iconDeletar);
    titulo.appendChild(spanDia);
    titulo.appendChild(spanHorario);
    titulo.appendChild(buttonEditar);
    titulo.appendChild(buttonDeletar);

    let divUnidade = document.createElement('div');
    divUnidade.innerHTML = `PUC unidade ${caronas[i].unidade}`;

    let divEndereco = document.createElement('div');
    divEndereco.innerHTML = `Rua ${caronas[i].rua}, ${caronas[i].numero}, bairro ${caronas[i].bairro}`;

    blocoInfo.appendChild(titulo);
    blocoInfo.appendChild(divUnidade);
    blocoInfo.appendChild(divEndereco);

    caronasTable.appendChild(blocoInfo);
  }
}

// cria uma carona
function criarCarona() {
  let diaSemana = $('input[type=radio]:checked').val();
  let unidade = $unidadeInput.val();
  let rua = $ruaInput.val();
  let numero = $numeroInput.val();
  let bairro = $bairroInput.val();
  let horario = $horarioInput.val();

  if (!diaSemana || !unidade || !rua || !numero || !bairro || !horario) {
    alert('Preencha todos os campos');
    return;
  }

  alert(
    'Dia da semana: ' +
      diaSemana +
      '\nUnidade: ' +
      unidade +
      '\nRua: ' +
      rua +
      '\nNumero: ' +
      numero +
      '\nBairro: ' +
      bairro +
      '\nHorário: ' +
      horario
  );

  let caronas = getCaronas();
  if (!caronas) caronas = [];

  let carona = {
    diaSemana,
    unidade,
    rua,
    numero,
    bairro,
    horario,
  };

  caronas.push(carona);

  setCaronas(caronas);

  location.href = 'index.html';
}

// redireciona para o form de edição
function handleEditarCarona(index) {
  location.href = `form-carona.html?editar=${index}`;
}

// edita uma carona
function editarCarona(index) {
  let caronas = getCaronas();
  let diaSemana = $('input[type=radio]:checked').val();
  let unidade = $('#unidade').val();
  let rua = $('#rua').val();
  let numero = $('#numero').val();
  let bairro = $('#bairro').val();
  let horario = $('#horario').val();
  let updatedCarona = {
    diaSemana,
    unidade,
    rua,
    numero,
    bairro,
    horario,
  };
  console.log({ updatedCarona });
  caronas.splice(index, 1, updatedCarona);
  setCaronas(caronas);

  location.href = 'index.html';
}

// deleta uma carona
function deletarCarona(index) {
  let caronas = getCaronas();
  caronas.splice(index, 1);
  setCaronas(caronas);
  loadCaronas();
}
