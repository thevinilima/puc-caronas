function setVagas(vagas) {
  localStorage.setItem('vagas', JSON.stringify(vagas))
}

function getVagas() {
  return JSON.parse(localStorage.getItem('vagas'))
}

function carregaVagas() {
  const vagas = getVagas()
  const vagasList = document.querySelector('.vagas-list')
  vagasList.innerHTML = null

  let index = 0
  for (const vaga of vagas) {
    const blocoInfo = document.createElement('div')
    blocoInfo.classList.add('blocoinfo')

    const titulo = document.createElement('h4')
    titulo.classList.add('sub')
    let vagaStr = parseInt(vaga.valor) === 1 ? 'vaga' : 'vagas'
    titulo.innerHTML = `${vaga.titulo}, ${vaga.valor} ${vagaStr}`
    const buttonEditar = document.createElement('button')
    const buttonDeletar = document.createElement('button')
    buttonEditar.classList.add('acao')
    buttonDeletar.classList.add('acao')
    buttonEditar.setAttribute('onclick', `handleEditarVaga(${index})`)
    buttonDeletar.setAttribute('onclick', `deletarVaga(${index})`)
    const iconEditar = document.createElement('i')
    iconEditar.classList.add('fa-solid', 'fa-pen-to-square')
    const iconDeletar = document.createElement('i')
    iconDeletar.classList.add('fa-regular', 'fa-circle-xmark')
    buttonEditar.appendChild(iconEditar)
    buttonDeletar.appendChild(iconDeletar)
    titulo.appendChild(buttonEditar)
    titulo.appendChild(buttonDeletar)

    const saidaDiv = document.createElement('div')
    const destinoDiv = document.createElement('div')
    const descDiv = document.createElement('div')
    saidaDiv.innerHTML = `<span class="subtitulo">Saída:</span> ${vaga.saida}`
    destinoDiv.innerHTML = `<span class="subtitulo">Destino:</span> ${vaga.destino}`
    descDiv.innerHTML = `<span class="subtitulo">Descrição:</span> ${vaga.desc}`

    blocoInfo.appendChild(titulo)
    blocoInfo.appendChild(saidaDiv)
    blocoInfo.appendChild(destinoDiv)
    vaga.desc && blocoInfo.appendChild(descDiv)

    vagasList.appendChild(blocoInfo)
    index++
  }
}

function handleEditarVaga(index) {
  location.href = `form-rota.html?editar=${index}`
}

function calcular(val) {
  var valor = $('#quantVagas').val()
  if (valor - val !== 0 && valor - val !== 15) {
    $('#quantVagas').val(valor - val)
  }
}

function anunciarVaga() {
  let titulo = $('#tVaga').val()
  let saida = $('#endSaida').val()
  let destino = $('#endDestino').val()
  let desc = $('#Desc').val()
  var valor = $('#quantVagas').val()

  if (!titulo || !saida || !destino || !valor) {
    alert('Preencha todos os campos obrigatórios!')
    return
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
  )

  let vagas = getVagas()
  if (!vagas) vagas = []
  vagas.push({
    titulo,
    saida,
    destino,
    desc,
    valor
  })
  setVagas(vagas)
  location.href = 'caronas.html'
}

function deletarVaga(index) {
  let vagas = getVagas()
  vagas.splice(index, 1)
  setVagas(vagas)
  carregaVagas()
}
