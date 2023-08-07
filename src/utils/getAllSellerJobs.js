import { useQuery } from "@tanstack/react-query";

const GetAllSellerJobs = () => {
  return useQuery({
    queryKey: ["allSellerJobs"],
    queryFn: () => {
      const allSellerJobs = localStorage.getItem("sellerJobs");
      return JSON.parse(allSellerJobs);
    },
  });
};

export default GetAllSellerJobs;
