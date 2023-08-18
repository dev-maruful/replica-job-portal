"use client";

import CarouselCard from "@/components/CarouselCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { ClockLoader } from "react-spinners";

const FullStackDevelopmentPage = () => {
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
    (job) => job.category === "Full-stack Development"
  );
  thisCategoryJobs;

  return (
    <>
      <h1 className="text-center mb-10 text-lg font-semibold">
        Full-stack Development Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {thisCategoryJobs.map((job, index) => (
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
    </>
  );
};

export default FullStackDevelopmentPage;
