const formEl = document.querySelector('form');
const user = JSON.parse(localStorage.getItem('user'));

document.body.onload = () => checkEdition();

const setRides = rides => {
  localStorage.setItem('rides', JSON.stringify(rides));
};

const getRides = () => {
  return JSON.parse(localStorage.getItem('rides'));
};

const checkEdition = () => {
  const queryString = location.search;
  if (!queryString) return;
  const params = new URLSearchParams(queryString);
  const index = params.get('editar');

  $('.titulo h1').html('Editar Anúncio');
};

formEl.addEventListener('submit', e => {
  e.preventDefault();

  try {
    const weekDay = $('input[name=weekDay]:checked', 'form').val();
    const time = $('#time').val();
    const spaces = $('#spaces').val();
    const route = $('input[name=route]:checked', 'form').val();

    const ride = {
      name: user.name,
      campus: user.campus,
      address: user.address,
      weekDay,
      route,
      time,
      spaces,
    };

    let rides = getRides();
    if (rides && rides.length) rides.push(ride);
    else rides = [ride];

    setRides(rides);

    const submitBtn = document.getElementById('submit');
    submitBtn.classList.add('saved');
    submitBtn.innerText = 'Anúncio feito!';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('saved');
      submitBtn.innerText = 'Anunciar';
      submitBtn.disabled = false;
      location.href = '..';
    }, 2 * 1000);
  } catch (err) {
    console.error(err);
    submitBtn.classList.add('error');
    submitBtn.innerText = 'Erro!';
    setTimeout(() => {
      submitBtn.classList.remove('error');
      submitBtn.innerText = 'Anunciar';
    }, 2 * 1000);
  }
});

const editRide = index => {
  const rides = getRides();
  rides.splice(index, 1, updatedRide);
  setRides(rides);

  location.href = '..';
};
