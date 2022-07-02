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
  barr: 'Barreiro',
};

const generateId = () => {
  return Math.random().toString(16).slice(2);
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem('db_users'));
};

const getUser = id => {
  if (id) return getUsers().find(u => u.id === id);
  return JSON.parse(localStorage.getItem('user'));
};

const getRides = () => {
  return JSON.parse(localStorage.getItem('rides'));
};

const setRides = rides => {
  localStorage.setItem('rides', JSON.stringify(rides));
};

const getRequests = () => {
  return JSON.parse(localStorage.getItem('requests'));
};

const setRequests = requests => {
  localStorage.setItem('requests', JSON.stringify(requests));
};
