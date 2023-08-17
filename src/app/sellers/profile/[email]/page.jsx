"use client";

import CarouselCard from "@/components/CarouselCard";
import UserPostedJobCard from "@/components/UserPostedJobCard";
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
      <div className="space-y-2 flex flex-col items-center md:w-1/3 mb-10 md:mb-0 md:sticky md:h-screen top-32 z-10">
        <img
          src={currentUser?.image}
          alt="seller image"
          className="w-72 h-72 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">{currentUser?.name}</h2>
        <h3 className="font-medium">{currentUser?.user_title}</h3>
        <p className="font-medium text-gray-500">Email: {currentUser?.email}</p>
        <p className="font-medium text-gray-500">Role: {currentUser?.role}</p>
      </div>
      <div className="md:w-2/3 mx-3">
        <h1 className="text-lg font-semibold mb-3">Jobs By This Seller</h1>
        <div>
          {thisSellerJobs.map((job, index) => (
            <UserPostedJobCard
              key={index}
              photo={job.photo}
              title={job.title}
              category={job.category}
              price={job.basic}
              email={job.email}
              hidden={true}
            ></UserPostedJobCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
