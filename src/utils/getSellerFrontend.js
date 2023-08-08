import { useQuery } from "@tanstack/react-query";

const GetSellerFrontend = () => {
  return useQuery({
    queryKey: ["sellerFrontend"],
    queryFn: () => {
      const allSellerJob = JSON.parse(localStorage.getItem("sellerJobs"));
      const sellerFrontend = allSellerJob.filter(
        (sellerJob) => sellerJob.category === "Frontend Development"
      );
      return [sellerFrontend];
    },
  });
};

export default GetSellerFrontend;
