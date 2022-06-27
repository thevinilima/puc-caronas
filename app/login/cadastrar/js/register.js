const formEl = document.querySelector('form');

const insertUser = user => {
  let users = getUsers();
  if (!users) users = [];
  if (
    users.some(
      u => u.email === $('#email').val() || u.code === $('#code').val()
    )
  )
    return false;

  users.push(user);
  localStorage.setItem('db_users', JSON.stringify(users));

  return true;
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem('db_users'));
};

const registerUser = () => {
  const name = $('#name').val();
  const email = $('#email').val();
  const code = $('#code').val();
  const pass = $('#pass').val();
  const passConfirmation = $('#confirm-pass').val();

  if (!name || !email || !code || !pass || !passConfirmation) return;

  const user = {
    name,
    email,
    code,
    pass,
  };

  if (insertUser(user)) {
    localStorage.setItem('user', JSON.stringify(user));
    location.href = '../../home';
  } else $('#user-exists-msg').removeClass('hidden');
};

const comparePasswords = () => {
  if ($('#pass').val() === $('#confirm-pass').val())
    $('#pass-warn').addClass('hidden');
  else $('#pass-warn').removeClass('hidden');
};

$('#pass').on('input', comparePasswords);
$('#confirm-pass').on('input', comparePasswords);

formEl.addEventListener('submit', e => {
  e.preventDefault();
  registerUser();
});