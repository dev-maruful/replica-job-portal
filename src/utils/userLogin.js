import { useQuery } from "@tanstack/react-query";

const UserLogin = () => {
  const { data, refetch } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: () => {
      const data = localStorage.getItem("isLoggedIn");
      refetch();
      return data ? data : null;
    },
  });

  return data;
};

export default UserLogin;
