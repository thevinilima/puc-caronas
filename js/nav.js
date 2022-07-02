const headerEl = document.querySelector('header');

const isFirstTime = () => {
  if (JSON.parse(localStorage.getItem('is_first_time'))) {
    headerEl.classList.add('hidden');
    return true;
  }
  headerEl.classList.remove('hidden');
  return false;
};

isFirstTime();
