document.body.onload = () => loadRequests();

const loadRequests = () => {
  const user = getUser();
  const userRides = getRides()?.filter(r => r.userId === user.id);
  const userRequests = getRequests()?.reduce((arr, req) => {
    const ride = userRides.find(r => r.id === req.rideId);
    if (ride && req.status === 'pending')
      return [...arr, { request: req, ride, user: getUser(req.userId) }];
    return arr;
  }, []);
  console.log(userRequests);

  const list = document.querySelector('.list');

  if (!userRequests.length) {
    list.innerHTML = '<div id="empty-msg">Nenhuma solicitação nova :)</div>';
    return;
  } else list.innerHTML = null;

  userRequests.forEach((obj, index) => {
    const { request, ride, user } = obj;
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    info.setAttribute('onclick', `handleOpenModal(${index})`);

    const addressStr = `${ride.address.street} ${ride.address.number}, ${ride.address.region}`;
    const infoHTML = `
      <h4>
        ${user.name} ${ride.type === 'get' ? 'ofereceu' : 'quer'} carona
      </h4>
      <div class="row">
        <div>
          <div class="icon">
            <i class="fa-regular fa-calendar"></i>
          </div>
          <span>${weekDays[ride.weekDay]}</span>
        </div>
        <div>
          <div class="icon">
            <i class="fa-regular fa-clock"></i>
          </div>
          <span>${ride.time}</span>
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
          <span>${ride.route === 'going' ? 'ida' : 'volta'}</span>
        </div>
      </div>
    `;
    info.insertAdjacentHTML('afterbegin', infoHTML);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    actions.innerHTML = `
      <button class="icon-btn edit-icon" title="Aceitar" onclick="handleAcceptRequest('${request.id}')">
        <i class="fa-solid fa-user-check"></i>
      </button>
      <button class="icon-btn delete-icon" title="Rejeitar" onclick="handleRejectRequest('${request.id}')">
        <i class="fa-solid fa-user-xmark"></i>
      </button>
  `;

    item.appendChild(info);
    item.appendChild(actions);

    list.appendChild(item);
  });
};

const handleAcceptRequest = id => {
  const requests = getRequests();
  const req = requests.find(req => req.id === id);
  req.status = 'accepted';
  const reqIndex = requests.indexOf(r => r.id === id);
  requests.splice(reqIndex, 1, req);
  setRequests(requests);

  const rides = getRides();
  const ride = rides.find(ride => ride.id === req.rideId);
  ride.passengers.push(req.userId);
  ride.spaces = Number(ride.spaces) - 1;
  const rideIndex = rides.indexOf(r => r.id === ride.id);
  rides.splice(rideIndex, 1, ride);
  setRides(rides);

  loadRequests();
};

const handleRejectRequest = id => {};
