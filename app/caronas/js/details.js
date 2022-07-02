const user = getUser();

const handleOpenModal = id => {
  const ride = getRide(id);
  $('.modal').addClass('opened');
  document.body.style.overflow = 'hidden';
  const modalContentEl = document.querySelector('.modal-content');

  const passengers = ride.passengers.map(passenger => {
    const p = getUser(passenger);

    return `
        <tr>
          <td class="name">${p.name}</td>
          <td>${p.code}</td>
          <td>${p.profile.course}</td>
        </tr>
      `;
  });

  const addressStr = `${ride.address.street} ${ride.address.number}, ${ride.address.region}`;
  const route =
    ride.route === 'going'
      ? `
          <div class="route">
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <span>${addressStr}</span>
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
            <div class="icon-info smaller">
              <div class="icon">
                <i class="fa-solid fa-angles-down"></i>
              </div>
              <span>voltando</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <span>${addressStr}</span>
            </div>
          </div>
    `;

  const requests = getRequests();
  const rideCreator = getUser(ride.userId);

  const generateModalButton = () => {
    if (rideCreator.id === user.id)
      return `
          <button id="take-ride-btn" onclick="handleEditRide('${ride.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
            Editar
          </button>
          <button id="take-ride-btn" class="error" onclick="handleDeleteRide('${ride.id}')">
            <i class="fa-regular fa-circle-xmark"></i>
            Apagar
          </button>
        `;

    if (
      requests.some(
        r =>
          r.userId === user.id && r.rideId === ride.id && r.status === 'pending'
      )
    )
      return `
          <button id="take-ride-btn" class="outlined" disabled>
            <i class="fa-solid fa-check"></i>
            Pedido enviado
          </button>
        `;

    if (ride.passengers.some(p => p === user.id))
      return `
        <button id="take-ride-btn" class="error" onclick="handleLeaveRide('${ride.id}')">
          <i class="fa-regular fa-circle-xmark"></i>
          Sair da Carona
        </button>
      `;

    if (ride.type === 'get')
      return `
          <button id="take-ride-btn" onclick="handleCreateRequest('${ride.id}')">
            <i class="fa-solid fa-hand-holding-heart"></i>
            Dar carona
          </button>
        `;

    if (ride.type === 'give')
      return `
          <button id="take-ride-btn" onclick="handleCreateRequest('${ride.id}')">
            <i class="fa-solid fa-car-side"></i>
            Pegar carona
          </button>
        `;
  };

  modalContentEl.innerHTML = `
    <div class="row">
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-user"></i>
        </div>
        <span>${rideCreator.name}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <span>${rideCreator?.profile.course}</span>
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
        <span class="number-size">${ride.time}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-user-group"></i>
        </div>
        <span>${ride.spaces} vaga${ride.spaces > 1 ? 's' : ''}</span>
      </div>
    </div>
    ${
      ride.meetingPoint
        ? `
        <div class="row meeting-point">
          <div class="icon-info">
            <div class="icon">
              <i class="fa-solid fa-people-arrows-left-right"></i>
            </div>
            <span>${ride.meetingPoint}</span>
          </div>
        </div>`
        : ''
    }
    ${route}
    ${
      rideCreator.id === user.id
        ? `
        <div class="modal-passengers-list">
          <h4>Passageiros/Condutores</h4>
          ${
            passengers.length
              ? `
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
              </tr>
            </thead>
            <tbody>
              ${passengers}
            </tbody>
          </table>`
              : '<div class="empty-msg">Nenhum passageiro ou condutor</div>'
          }
        </div>`
        : ''
    }
    <div class="modal-btn">${generateModalButton()}</div>
  `;
};

const handleCreateRequest = id => {
  const modalBtn = document.getElementById('take-ride-btn');
  try {
    const request = {
      id: generateId(),
      rideId: id,
      userId: user.id,
      seenBy: [],
      status: 'pending',
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
      closeModal();
    }, 1 * 1000);
  } catch (err) {
    console.error(err);
    modalBtn.classList.add('error');
    modalBtn.innerHTML = 'Erro!';
    setTimeout(() => {
      modalBtn.classList.remove('error');
      modalBtn.innerText = 'Pegar carona';
    }, 1 * 1000);
  }
};

const handleLeaveRide = (id, userId = getUser().id) => {
  const ride = getRide(id);
  ride.passengers = ride.passengers.filter(p => p !== userId);
  ride.spaces = Number(ride.spaces) + 1;
  setRides(
    getRides().map(r => {
      if (r.id === ride.id) return ride;
      return r;
    })
  );
  closeModal();
  loadRides();
};
