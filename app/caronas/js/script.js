document.body.onload = () => loadRides();

function loadRides() {
  const storedRides = getRides();
  if (!storedRides) return;

  const currUser = getUser();
  const rides = storedRides
    .filter(
      ride =>
        (getUser(ride.userId).profile.campus === currUser.profile.campus &&
          Number(ride.spaces)) ||
        ride.passengers.some(p => p === currUser.id) ||
        ride.userId === currUser.id
    )
    .sort((curr, next) => {
      if (curr.userId === currUser.id && next.userId !== currUser.id) return -1;
      return 1;
    });

  const list = document.querySelector('.list');
  if (!rides.length)
    list.innerHTML =
      '<div class="empty-msg">Nenhuma carona cadastrada :(</div>';
  else list.innerHTML = null;

  rides.forEach(ride => {
    const rideCreator = getUser(ride.userId);

    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    info.setAttribute('onclick', `handleOpenModal('${ride.id}')`);

    const addressStr = `${ride.address.street} ${ride.address.number}, ${ride.address.region}`;

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
          <span class="number-size">${ride.time}</span>
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
          <div class="address">${addressStr}</div>
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
    item.appendChild(info);

    const actionsHTML =
      ride.userId === currUser.id
        ? `
      <button class="icon-btn edit-icon" title="Editar" onclick="handleEditRide('${ride.id}')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon-btn delete-icon" title="Apagar" onclick="handleDeleteRide('${ride.id}')">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `
        : null;
    if (actionsHTML) {
      const actions = document.createElement('div');
      actions.classList.add('actions');
      actions.innerHTML = actionsHTML;

      item.appendChild(actions);
    }

    list.appendChild(item);
  });
}

function handleEditRide(id) {
  closeModal();
  location.href = `criar/?editar=${id}`;
}

function handleDeleteRide(id) {
  if (confirm('Deseja excluir essa carona?')) {
    const rides = getRides();
    setRides(rides.filter(ride => ride.id !== id));

    closeModal();
    loadRides();
  }
}
