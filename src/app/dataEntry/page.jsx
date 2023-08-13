"use client";

import CarouselCard from "@/components/CarouselCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { ClockLoader } from "react-spinners";

const DataEntryPage = () => {
  const { data: allJobs, isLoading } = GetAllSellerJobs();

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

  const thisCategoryJobs = allJobs.filter(
    (job) => job.category === "Data Entry"
  );
  thisCategoryJobs;

  return (
    <div className="grid grid-cols-3 gap-5">
      {thisCategoryJobs.map((job, index) => (
        <CarouselCard
          key={index}
          jobPhoto={job.photo}
          jobTitle={job.title}
          sellerImage={job.seller_image}
          sellerName={job.seller_name}
          sellerTitle={job.seller_title}
          pricing={job.basic}
        ></CarouselCard>
      ))}
    </div>
  );
};

export default DataEntryPage;
