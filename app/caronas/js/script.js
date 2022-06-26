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

document.body.onload = () => carregaRides();

function setRides(rides) {
  localStorage.setItem('rides', JSON.stringify(rides));
}

function getRides() {
  return JSON.parse(localStorage.getItem('rides'));
}

function carregaRides() {
  const rides = getRides();
  if (!rides) return;

  const list = document.querySelector('.list');
  list.innerHTML = null;

  rides.forEach((ride, index) => {
    const item = document.createElement('div');
    item.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');

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
    carregaRides();
  }
}
