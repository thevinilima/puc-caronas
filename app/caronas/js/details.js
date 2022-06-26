const handleOpenModal = index => {
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
};

const handleTakeRide = index => {
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
};
