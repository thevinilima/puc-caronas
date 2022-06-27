const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const url = location.href.split('/');
  if (!user && !url.some(str => str === 'login')) {
    const appIndex = url.indexOf('app');
    url.splice(appIndex + 1);
    url.push('login', '');
    location.href = url.join('/');
  }
};

checkAuth();
