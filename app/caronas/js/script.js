document.body.onload = () => loadRides();

function setRides(rides) {
  localStorage.setItem('rides', JSON.stringify(rides));
}

function setRequests(requests) {
  localStorage.setItem('requests', JSON.stringify(requests));
}

function getRequests() {
  return JSON.parse(localStorage.getItem('requests'));
}

function loadRides() {
  const rides = getRides();
  if (!rides) return;

  const list = document.querySelector('.list');
  if (!rides.length)
    list.innerHTML = '<div id="empty-msg">Nenhuma carona cadastrada :(</div>';
  else list.innerHTML = null;

  rides.forEach((ride, index) => {
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    info.setAttribute('onclick', `handleOpenModal(${index})`);

    const addressStr = `${ride.address.street} ${ride.address.number}, ${ride.address.region}`;
    const rideCreator = getUsers().find(u => u.id === ride.userId);
    const infoHTML = `
      <h4>
        ${rideCreator.name} ${
      ride.type === 'get' ? 'precisa de' : 'está dando'
    } carona
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
        <div>
          <div class="icon">
            <i class="fa-solid fa-user-group"></i>
          </div>
          <span>${ride.spaces} vaga${ride.spaces > 1 ? 's' : ''}</span>
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
      <button class="icon-btn edit-icon" title="Editar" onclick="handleEditRide(${index})">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon-btn delete-icon" title="Apagar" onclick="handleDeleteRide(${index})">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;

    item.appendChild(info);
    item.appendChild(actions);

    list.appendChild(item);
  });
}

function handleEditRide(index) {
  location.href = `criar/?editar=${index}`;
}

function handleDeleteRide(index) {
  if (confirm('Deseja excluir essa carona?')) {
    const rides = getRides();
    rides.splice(index, 1);
    setRides(rides);
    loadRides();
  }
}
