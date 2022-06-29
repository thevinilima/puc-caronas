const formEl = document.querySelector('form');
const user = JSON.parse(localStorage.getItem('user'));

const edit = {
  status: false,
  index: null,
};
document.body.onload = () => checkEdition();

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
  $('#meetingPoint').val(ride.meetingPoint);
};

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = document.getElementById('submit');
  try {
    const weekDay = $('input[name=weekDay]:checked', 'form').val();
    const time = $('#time').val();
    const spaces = $('#spaces').val();
    const route = $('input[name=route]:checked', 'form').val();
    const meetingPoint = $('#meetingPoint').val();

    const ride = {
      campus: user.profile.campus,
      address: user.profile.address,
      type: user.profile.status,
      weekDay,
      route,
      time,
      spaces,
      meetingPoint,
      passengers: [],
    };

    if (edit.status) {
      editRide(ride);
      return;
    }

    ride.id = generateId();
    ride.userId = user.id;

    let rides = getRides();
    if (rides?.length) rides.push(ride);
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
    }, 1 * 1000);
  } catch (err) {
    console.error(err);
    submitBtn.classList.add('error');
    submitBtn.innerText = 'Erro!';
    setTimeout(() => {
      submitBtn.classList.remove('error');
      submitBtn.innerText = 'Anunciar';
    }, 1 * 1000);
  }
});

const editRide = ride => {
  const submitBtn = document.getElementById('submit');
  try {
    const rides = getRides();
    rides.splice(edit.index, 1, { ...rides[edit.index], ...ride });
    setRides(rides);

    submitBtn.classList.add('saved');
    submitBtn.innerText = 'Salvo!';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('saved');
      submitBtn.innerText = 'Salvar';
      submitBtn.disabled = false;
      location.href = '..';
    }, 1 * 1000);
  } catch (err) {
    console.error(err);
    submitBtn.classList.add('error');
    submitBtn.innerText = 'Erro!';
    setTimeout(() => {
      submitBtn.classList.remove('error');
      submitBtn.innerText = 'Salvar';
    }, 1 * 1000);
  }
};
