const formEl = document.querySelector('form');
const user = JSON.parse(localStorage.getItem('user'));

let edit = false;
let id = generateId();
document.body.onload = () => checkEdition();

const checkEdition = () => {
  const queryString = location.search;
  if (!queryString) return;
  const params = new URLSearchParams(queryString);
  id = params.get('editar');
  edit = true;

  const ride = getRide(id);

  $('h1').text('Editar Anúncio');
  $('#submit').text('Salvar');
  $(`input[name=rideType][value='${ride.type}']`).prop('checked', true);
  $(`input[name=weekDay][value='${ride.weekDay}']`).prop('checked', true);
  $('#time').val(ride.time);
  $('#spaces').val(ride.spaces);
  $(`input[name=route][value='${ride.route}']`).prop('checked', true);
  $('#meetingPoint').val(ride.meetingPoint);
};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  try {
    const type = $('input[name=rideType]:checked', 'form').val();
    const weekDay = $('input[name=weekDay]:checked', 'form').val();
    const time = $('#time').val();
    const spaces = $('#spaces').val();
    const route = $('input[name=route]:checked', 'form').val();
    const meetingPoint = $('#meetingPoint').val();

    const ride = {
      id,
      campus: user.profile.campus,
      address: user.profile.address,
      type,
      weekDay,
      route,
      time,
      spaces,
      meetingPoint,
      passengers: [],
    };

    if (edit) {
      editRide(ride);
      return;
    }

    ride.id = generateId();
    ride.userId = user.id;

    let rides = getRides();
    if (rides?.length) rides.push(ride);
    else rides = [ride];

    setRides(rides);

    $('#submit').addClass('saved');
    $('#submit').text('Anúncio feito!');
    $('#submit').prop('disabled', true);
    setTimeout(() => {
      location.href = '..';
    }, 1 * 1000);
  } catch (err) {
    console.error(err);
    $('#submit').addClass('error');
    $('#submit').text('Erro!');
    setTimeout(() => {
      $('#submit').removeClass('error');
      $('#submit').text('Anunciar');
    }, 1 * 1000);
  }
});

const editRide = ride => {
  try {
    const rides = getRides();
    setRides(
      rides.map(r => {
        if (r.id === ride.id) return { ...r, ...ride };
        return r;
      })
    );

    $('#submit').addClass('saved');
    $('#submit').text('Salvo!');
    $('#submit').prop('disabled', true);
    setTimeout(() => {
      // location.href = '..';
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
};
