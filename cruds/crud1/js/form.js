function setVagas(vagas) {
  localStorage.setItem('vagas', JSON.stringify(vagas))
}

function getVagas() {
  return JSON.parse(localStorage.getItem('vagas'))
}

function checkEdicao() {
  const queryString = location.search
  if (!queryString) return
  const params = new URLSearchParams(queryString)
  const index = params.get('editar')

  const vagas = getVagas()
  let vaga = vagas[index]

  $('#tVaga').val(vaga.titulo)
  $('#endSaida').val(vaga.saida)
  $('#endDestino').val(vaga.destino)
  $('#Desc').val(vaga.desc)
  $('#quantVagas').val(vaga.valor)

  $botaoAcao = $('#botao-acao')
  $botaoAcao.attr('onclick', `editarVaga(${index})`)
  $botaoAcao.html('Salvar')
  $('.titulo h1').html('Editar Anúncio')
}

function editarVaga(index) {
  let vagas = getVagas()
  let titulo = $('#tVaga').val()
  let saida = $('#endSaida').val()
  let destino = $('#endDestino').val()
  let desc = $('#Desc').val()
  var valor = $('#quantVagas').val()
  let updatedVaga = {
    titulo,
    saida,
    destino,
    desc,
    valor
  }
  vagas.splice(index, 1, updatedVaga)
  setVagas(vagas)

  location.href = 'caronas.html'
}
