const modalEl = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');

const closeModal = () => {
  modalEl.classList.remove('opened');
  document.body.style.overflow = 'auto';
};

document.addEventListener('click', e => {
  if (e.target === modalEl) closeModal();
});

document.addEventListener('keyup', e => {
  if (e.key === 'Escape') closeModal();
});

closeBtn.addEventListener('click', closeModal);
