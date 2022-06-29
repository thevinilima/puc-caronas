document.body.onload = () => loadRequests();

const getRequests = () => {
  return JSON.parse(localStorage.getItem('requests'));
};

const loadRequests = () => {
  const user = getUser();
  const userRides = getRides()?.filter(r => r.userId === user.id);
  const userRequests = getRequests()?.reduce((arr, req) => {
    const ride = userRides.find(r => r.id === req.rideId);
    if (ride)
      return [...arr, { request: req, ride, user: getUser(req.userId) }];
    else return arr;
  }, []);
  console.log(userRequests);

  const list = document.querySelector('.list');

  if (!userRequests.length) {
    list.innerHTML = '<div id="empty-msg">Nenhuma solicitação recebida</div>';
    return;
  } else list.innerHTML = null;

  userRequests.forEach((req, index) => {
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    info.setAttribute('onclick', `handleOpenModal(${index})`);

    const addressStr = `${req.ride.address.street} ${req.ride.address.number}, ${req.ride.address.region}`;
    const infoHTML = `
      <h4>
        ${req.user.name} ${req.ride.type === 'get' ? 'ofereceu' : 'quer'} carona
      </h4>
      <div class="row">
        <div>
          <div class="icon">
            <i class="fa-regular fa-calendar"></i>
          </div>
          <span>${weekDays[req.ride.weekDay]}</span>
        </div>
        <div>
          <div class="icon">
            <i class="fa-regular fa-clock"></i>
          </div>
          <span>${req.ride.time}</span>
        </div>
      </div>
      <div class="row route">
        <div>
          <div class="icon">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <span>${addressStr}</span>
        </div>
        <div>
          <div class="icon">
            <i class="fa-solid fa-route"></i>
          </div>
          <span>${req.ride.route === 'going' ? 'ida' : 'volta'}</span>
        </div>
      </div>
    `;
    info.insertAdjacentHTML('afterbegin', infoHTML);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    actions.innerHTML = `
      <button class="icon-btn edit-icon" title="Aceitar">
        <i class="fa-solid fa-user-check"></i>
      </button>
      <button class="icon-btn delete-icon" title="Rejeitar">
        <i class="fa-solid fa-user-xmark"></i>
      </button>
  `;

    item.appendChild(info);
    item.appendChild(actions);

    list.appendChild(item);
  });
};

const handleAcceptRequest = index => {};

const handleRejectRequest = index => {};
