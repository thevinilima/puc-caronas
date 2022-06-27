const formEl = document.querySelector('form');

const login = () => {
  const login = $('#login').val();
  const pass = $('#pass').val();

  if (!login || !pass) return;

  const users = JSON.parse(localStorage.getItem('db_users'));
  if (users) {
    const user = users.find(
      u => (u.email === login || u.code === login) && u.pass === pass
    );
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      location.href = '../home/';
      return;
    }
  }
  $('#login-error-msg').removeClass('hidden');
};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  login();
});
