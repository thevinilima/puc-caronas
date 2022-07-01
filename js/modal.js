const modalEl = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');

const closeModal = () => {
  modalEl.classList.remove('opened');
  document.body.style.overflow = 'auto';
};

document.addEventListener('click', e => {
  if (e.target === modalEl) closeModal();
});

closeBtn.addEventListener('click', closeModal);
