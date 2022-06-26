const nameInput = document.getElementById('name');
const campusSelect = document.getElementById('campus');
const classTimeSelect = document.getElementById('classTime');
const courseInput = document.getElementById('course');
const streetInput = document.getElementById('street');
const numberInput = document.getElementById('number');
const regionInput = document.getElementById('region');
const statusRadio = document.querySelectorAll('input[name="status"]');

const formEl = document.querySelector('form');
const deleteBtn = document.getElementById('delete-btn');

document.body.onload = () => loadUser();

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const setUser = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

const loadUser = () => {
  let user = getUser();
  if (!user) {
    user = {
      name: 'Fulano',
      campus: 'praca',
      classTime: 'night',
      course: 'Eng de Software',
      address: {
        street: 'Rua dos Bobos',
        number: '0',
        region: 'Nárnia',
      },
      statusCarona: 'give',
    };
  }

  nameInput.value = user.name;
  campusSelect.value = user.campus;
  classTimeSelect.value = user.classTime;
  courseInput.value = user.course;
  streetInput.value = user.address.street;
  numberInput.value = user.address.number;
  regionInput.value = user.address.region;
  statusRadio.forEach(input => {
    if (input.getAttribute('id') === user.status) input.checked = true;
  });
};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  try {
    let status;
    statusRadio.forEach(input => {
      if (input.checked) status = input.value;
    });

    setUser({
      name: nameInput.value,
      campus: campusSelect.value,
      classTime: classTimeSelect.value,
      course: courseInput.value,
      address: {
        street: streetInput.value,
        number: numberInput.value,
        region: regionInput.value,
      },
      status,
    });

    const submitBtn = document.getElementById('submit');
    submitBtn.classList.add('saved');
    submitBtn.innerText = 'Salvo!';
    setTimeout(() => {
      submitBtn.classList.remove('saved');
      submitBtn.innerText = 'Salvar';
    }, 2 * 1000);
  } catch (err) {
    console.error(err);
    submitBtn.classList.add('error');
    submitBtn.innerText = 'Erro!';
    setTimeout(() => {
      submitBtn.classList.remove('error');
      submitBtn.innerText = 'Salvar';
    }, 2 * 1000);
  }
});

deleteBtn.addEventListener('click', () => {
  if (window.confirm('Deseja excluir seu perfil?')) {
    setUser(null);
    loadUser();
  }
  if (!getUser()) window.alert('Perfil excluído com sucesso!');
});
