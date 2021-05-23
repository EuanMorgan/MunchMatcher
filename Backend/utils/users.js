const users = [];

const userJoin = (id, room, username) => {
  const user = { id, room, username };

  users.push(user);

  return user;
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = { userJoin, getCurrentUser };
