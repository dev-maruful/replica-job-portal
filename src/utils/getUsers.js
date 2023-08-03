const getUsers = () => {
  let users = {};

  // get users from local storage
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  return users;
};
