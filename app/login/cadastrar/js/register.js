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

  user.id = generateId();
  users.push(user);
  localStorage.setItem('db_users', JSON.stringify(users));
  localStorage.setItem('is_first_time', true);

  return true;
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
    profile: {},
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
