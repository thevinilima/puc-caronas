const modalEl = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');

document.addEventListener('click', e => {
  if (e.target === modalEl) {
    modalEl.classList.remove('opened');
    document.body.style.overflow = 'auto';
  }
});

closeBtn.addEventListener('click', () => {
  modalEl.classList.remove('opened');
  document.body.style.overflow = 'auto';
});
