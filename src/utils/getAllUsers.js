import { useQuery } from "@tanstack/react-query";

const GetAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => {
      const allUsers = localStorage.getItem("users");
      return JSON.parse(allUsers);
    },
  });
};

export default GetAllUsers;
