"use client";

import CarouselCard from "@/components/CarouselCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { usePathname } from "next/navigation";
import { ClockLoader } from "react-spinners";

const SellerProfilePage = () => {
  const { data: allJobs, isLoading } = GetAllSellerJobs();
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

  const thisSellerJobs = allJobs?.filter((job) => job.email === sellerEmail);

  console.log(thisSellerJobs[0].email);

  return (
    <div className="space-y-14">
      <div className="flex flex-col justify-center items-center space-y-2">
        <img
          src={thisSellerJobs[0].seller_image}
          alt="seller image"
          className="w-72 h-72 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold">
          Seller name: {thisSellerJobs[0].seller_name}
        </h2>
        <h3 className="font-medium">
          Seller title: {thisSellerJobs[0].seller_title}
        </h3>
        <p className="font-medium text-gray-500">
          Seller email: {thisSellerJobs[0].email}
        </p>
      </div>
      <div>
        <h1 className="text-center mb-10 text-lg font-semibold">
          Jobs By This Seller
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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