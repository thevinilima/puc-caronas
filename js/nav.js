const headerEl = document.querySelector('header');

const checkFirstTime = () => {
  if (localStorage.getItem('is_first_time')) headerEl.classList.add('hidden');
  else headerEl.classList.remove('hidden');
};

checkFirstTime();
