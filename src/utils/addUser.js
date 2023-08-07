const addUser = (data) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  //   check the user is already existing
  const existingUser = users?.find((user) => user?.email === data.email);
  if (existingUser) {
    return { message: "User already exists", status: "failed" };
  } else {
    users.push(data);

    //   save the updated user to the local storage
    localStorage.setItem("users", JSON.stringify(users));
    return { message: "User registered successfully", status: "success" };
  }
};

export default addUser;
