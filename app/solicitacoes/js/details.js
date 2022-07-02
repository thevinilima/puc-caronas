const handleOpenModal = id => {
  $('.modal').addClass('opened');
  document.body.style.overflow = 'hidden';

  const request = getRequests().find(r => r.id === id);
  const ride = getRide(request.rideId);

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
              <span>${addressStr}</span>
            </div>
          </div>
    `;

  const reqCreator = getUser(request.userId);
  $('.modal-content').html(`
    <h4>
      ${reqCreator.name} ${ride.type === 'get' ? 'te ofereceu' : 'pediu'} carona
    </h4>
    <div class="row" id="user-info">
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <span>${reqCreator.code}</span>
      </div>
      <div class="icon-info">
        <div class="icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <span>${reqCreator.profile.course}</span>
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
    <div class="modal-btn">
      <button id="take-ride-btn" class="saved" onclick="handleAcceptRequest('${id}')">
        <i class="fa-solid fa-user-check"></i>
        Aceitar
      </button>
      <button id="take-ride-btn" class="error" onclick="handleRejectRequest('${id}')">
        <i class="fa-solid fa-user-xmark"></i>
        Rejeitar
      </button>
    </div>
  `);
};
