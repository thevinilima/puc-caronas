// Inputs
const nomeInput = document.getElementById('nome');
const unidadeInput = document.getElementById('unidade');
const turnoInput = document.getElementById('turno');
const cursoInput = document.getElementById('curso');
const bairroInput = document.getElementById('bairro');
const regiaoInput = document.getElementById('regiao');
const caronaStatusInputs = document.querySelectorAll(
  'input[name="status-carona"]'
);

const formEl = document.querySelector('form');

const getUser = () => {
  return JSON.parse(localStorage.getItem('usuario'));
};

const setUser = user => {
  localStorage.setItem('usuario', JSON.stringify(user));
};

// Carrega informações
const loadUser = () => {
  let user = getUser();
  // Mock
  if (!user) {
    user = {
      nome: 'Fulano',
      unidade: 'Praça',
      turno: 'Noite',
      curso: 'Eng de Software',
      bairro: 'Serra',
      regiao: 'Centro-Sul',
      statusCarona: 'give',
    };
  }

  nomeInput.value = user.nome;
  unidadeInput.value = user.unidade;
  turnoInput.value = user.turno;
  cursoInput.value = user.curso;
  bairroInput.value = user.bairro;
  regiaoInput.value = user.regiao;
  caronaStatusInputs.forEach(input => {
    if (input.getAttribute('id') === user.statusCarona) input.checked = true;
  });
};

// Editar usuário
formEl.addEventListener('submit', e => {
  e.preventDefault();
  let statusCarona;
  caronaStatusInputs.forEach(input => {
    if (input.checked) statusCarona = input.value;
  });
  setUser({
    nome: nomeInput.value,
    unidade: unidadeInput.value,
    turno: turnoInput.value,
    curso: cursoInput.value,
    bairro: bairroInput.value,
    regiao: regiaoInput.value,
    statusCarona,
  });
});

// Deletar usuário
const deleteUser = () => {
  if (window.confirm('Deseja excluir seu perfil?')) {
    setUser(null);
    loadUser();
  }
  if (!getUser()) window.alert('Perfil excluído com sucesso!');
};
