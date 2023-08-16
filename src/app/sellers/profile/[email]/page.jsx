"use client";

import CarouselCard from "@/components/CarouselCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import GetAllUsers from "@/utils/getAllUsers";
import { usePathname } from "next/navigation";
import { ClockLoader } from "react-spinners";

const SellerProfilePage = () => {
  const { data: allJobs, isLoading } = GetAllSellerJobs();
  const { data: allUsers } = GetAllUsers();
  const pathname = usePathname();
  const sellerEmail = pathname.split("/")[3];

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-108px)] flex justify-center items-center">
        <ClockLoader
          color="#8c52ff"
          loading={isLoading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const currentUser = allUsers?.find((user) => user.email === sellerEmail);
  const thisSellerJobs = allJobs?.filter((job) => job.email === sellerEmail);

  return (
    <div className="md:flex gap-5 relative">
      <div className="space-y-2 flex flex-col items-center md:items-start md:w-1/3 mb-10 md:mb-0 md:sticky md:h-screen top-32 z-10">
        <img
          src={currentUser?.image}
          alt="seller image"
          className="w-72 h-72 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">
          Seller name: {currentUser?.name}
        </h2>
        <h3 className="font-medium">Seller title: {currentUser?.user_title}</h3>
        <p className="font-medium text-gray-500">
          Seller email: {currentUser?.email}
        </p>
      </div>
      <div className="md:w-2/3">
        <h1 className="text-lg font-semibold mb-5">Jobs By This Seller</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {thisSellerJobs.map((job, index) => (
            <CarouselCard
              key={index}
              jobPhoto={job.photo}
              jobTitle={job.title}
              sellerImage={job.seller_image}
              sellerName={job.seller_name}
              sellerTitle={job.seller_title}
              pricing={job.basic}
              email={job.email}
            ></CarouselCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
