const formEl = document.querySelector('form');
const user = JSON.parse(localStorage.getItem('user'));

const edit = {
  status: false,
  index: null,
};
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

  edit.status = true;
  edit.index = index;

  const ride = getRides()[index];

  $('h1').text('Editar Anúncio');
  $('#submit').text('Salvar');
  $(`input[name=weekDay][value='${ride.weekDay}']`).prop('checked', true);
  $('#time').val(ride.time);
  $('#spaces').val(ride.spaces);
  $(`input[name=route][value='${ride.route}']`).prop('checked', true);
};

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = document.getElementById('submit');
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

    if (edit.status) {
      editRide(ride);
      return;
    }

    let rides = getRides();
    if (rides && rides.length) rides.push(ride);
    else rides = [ride];

    setRides(rides);

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

const editRide = ride => {
  const submitBtn = document.getElementById('submit');
  try {
    const rides = getRides();
    rides.splice(edit.index, 1, ride);
    setRides(rides);

    submitBtn.classList.add('saved');
    submitBtn.innerText = 'Salvo!';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('saved');
      submitBtn.innerText = 'Salvar';
      submitBtn.disabled = false;
      location.href = '..';
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
};