const generateId = () => {
  return Math.random().toString(16).slice(2);
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem('db_users'));
};
