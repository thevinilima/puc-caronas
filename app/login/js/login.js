const formEl = document.querySelector('form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');

const login = () => {};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  login();
});
