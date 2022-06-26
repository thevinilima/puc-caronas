const weekDays = {
  mon: 'segunda',
  tue: 'terça',
  wed: 'quarta',
  thu: 'quinta',
  fri: 'sexta',
};

const campuses = {
  praca: 'Praça da Liberdade',
  coreu: 'Coração Eucarístico',
  sgabr: 'São Gabriel',
};

document.body.onload = () => loadRides();

function setRides(rides) {
  localStorage.setItem('rides', JSON.stringify(rides));
}

function getRides() {
  return JSON.parse(localStorage.getItem('rides'));
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
  list.innerHTML = null;

  rides.forEach((ride, index) => {
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    info.setAttribute('onclick', `handleOpenModal(${index})`);

    const route =
      ride.route === 'going'
        ? `
          <div>
            <div class="icon">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <span>${ride.address.street} ${ride.address.number}, ${
            ride.address.region
          }</span>
          </div>
          <div>
            <div class="icon">
              <i class="fa-solid fa-angles-down"></i>
            </div>
            <span>indo</span>
          </div>
          <div>
            <div class="icon">
              <i class="fa-regular fa-building"></i>
            </div>
            <span>PUC ${campuses[ride.campus]}</span>
          </div>
        `
        : `
          <div>
            <div class="icon">
              <i class="fa-regular fa-building"></i>
            </div>
            <span>PUC ${campuses[ride.campus]}</span>
          </div>
          <div>
            <div class="icon">
              <i class="fa-solid fa-angles-down"></i>
            </div>
            <span>voltando</span>
          </div>
          <div>
            <div class="icon">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <span>${ride.address.street} ${ride.address.number}, ${
            ride.address.region
          }</span>
          </div>
        `;

    const infoHTML = `
      <h4>${ride.name} está dando carona</h4>
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
      ${route}
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

function handleOpenModal(index) {
  const ride = getRides()[index];
  $('.modal').addClass('opened');
  document.body.style.overflow = 'hidden';
  const modalContentEl = document.querySelector('.modal-content');

  const route =
    ride.route === 'going'
      ? `
          <div class="route">
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <span>${ride.address.street} ${ride.address.number}, ${
          ride.address.region
        }</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-angles-down"></i>
              </div>
              <span>indo</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="fa-regular fa-building"></i>
              </div>
              <span>PUC ${campuses[ride.campus]}</span>
            </div>
          </div>
        `
      : `
          <div class="route">
            <div class="icon-info">
              <div class="icon">
                <i class="fa-regular fa-building"></i>
              </div>
              <span>PUC ${campuses[ride.campus]}</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-angles-down"></i>
              </div>
              <span>voltando</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <span>${ride.address.street} ${ride.address.number}, ${
          ride.address.region
        }</span>
            </div>
          </div>
    `;

  const requests = getRequests();
  const requestSent = requests && requests.some(r => r.userIndex === 0); // editar
  modalContentEl.innerHTML = `
    <div class="row">
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-user"></i>
        </div>
        <span>${ride.name}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <span>Eng de Software</span>
      </div>
    </div>
    <div class="row">
      <div class="icon-info">
        <div class="icon">
          <i class="fa-regular fa-calendar"></i>
        </div>
        <span>${weekDays[ride.weekDay]}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-regular fa-clock"></i>
        </div>
        <span>${ride.time}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-user-group"></i>
        </div>
        <span>${ride.spaces} vaga${ride.spaces > 1 ? 's' : ''}</span>
      </div>
    </div>
    <div class="row meeting-point">
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-people-arrows-left-right"></i>
        </div>
        <span>${ride.meetingPoint}</span>
      </div>
    </div>
    ${route}
    <div class="modal-btn">
      ${
        requestSent
          ? `
            <button id="take-ride-btn" class="outlined" disabled>
              <i class="fa-solid fa-check"></i>
              Pedido enviado
            </button>
          `
          : `
            <button id="take-ride-btn" onclick="handleTakeRide(${index})">
              <i class="fa-solid fa-car-side"></i>
              Pegar carona
            </button>
          `
      }
    </div>
  `;
}

function handleTakeRide(index) {
  const modalBtn = document.getElementById('take-ride-btn');
  try {
    const request = {
      userIndex: 0, // editar
      rideIndex: index,
      seenBy: [],
    };

    let requests = getRequests();
    if (requests) requests.push(request);
    else requests = [request];
    setRequests(requests);

    modalBtn.classList.add('saved');
    modalBtn.innerHTML = 'Pedido enviado!';
    modalBtn.disabled = true;
    setTimeout(() => {
      modalBtn.classList.remove('saved');
      modalBtn.innerText = 'Pegar carona';
      modalBtn.disabled = false;
      $('.modal').removeClass('opened');
    }, 2 * 1000);
  } catch (err) {
    console.error(err);
    modalBtn.classList.add('error');
    modalBtn.innerHTML = 'Erro!';
    setTimeout(() => {
      modalBtn.classList.remove('error');
      modalBtn.innerText = 'Pegar carona';
    }, 2 * 1000);
  }
}
