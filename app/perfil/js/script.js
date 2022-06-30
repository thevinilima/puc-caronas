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
const logoutBtn = document.getElementById('logout-btn');

document.body.onload = () => loadUser();

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const setUser = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

const loadUser = () => {
  const user = getUser();

  if (localStorage.getItem('is_first_time')) {
    $('.first-time-warn').removeClass('hidden');
  }

  nameInput.value = user.name;
  campusSelect.value = user.profile.campus || '';
  classTimeSelect.value = user.profile.classTime || '';
  courseInput.value = user.profile.course || '';
  if (user.profile.address) {
    streetInput.value = user.profile.address.street || '';
    numberInput.value = user.profile.address.number || '';
    regionInput.value = user.profile.address.region || '';
  }
  statusRadio.forEach(input => {
    if (input.getAttribute('id') === user.profile.status) input.checked = true;
  });
};

const updateUserInDB = () => {
  const user = getUser();
  const db = JSON.parse(localStorage.getItem('db_users'));
  localStorage.setItem(
    'db_users',
    JSON.stringify(
      db.map(u => {
        if (u.id === user.id) return user;
        return u;
      })
    )
  );
};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  try {
    const user = getUser();
    setUser({
      ...user,
      name: nameInput.value,
      profile: {
        campus: campusSelect.value,
        classTime: classTimeSelect.value,
        course: courseInput.value,
        address: {
          street: streetInput.value,
          number: numberInput.value,
          region: regionInput.value,
        },
      },
    });
    updateUserInDB();

    $('#submit').addClass('saved');
    $('#submit').text('Salvo!');
    setTimeout(() => {
      $('#submit').removeClass('saved');
      $('#submit').text('Salvar');
      localStorage.removeItem('is_first_time');
      $('.first-time-warn').addClass('hidden');
      checkFirstTime();
    }, 1 * 1000);
  } catch (err) {
    console.error(err);
    $('#submit').addClass('error');
    $('#submit').text('Erro!');
    setTimeout(() => {
      $('#submit').removeClass('error');
      $('#submit').text('Salvar');
    }, 1 * 1000);
  }
});

deleteBtn.addEventListener('click', () => {
  if (window.confirm('Deseja excluir seu perfil?')) {
    setUser(null);
  }
  if (!getUser()) window.alert('Perfil excluído com sucesso!');
  checkAuth();
});

logoutBtn.addEventListener('click', () => {
  if (confirm('Deseja encerrar sua sessão?')) {
    localStorage.removeItem('user');
    checkAuth();
  }
});
