"use client";

import RelatedJobsCard from "@/components/RelatedJobsCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { usePathname } from "next/navigation";
import { ClockLoader } from "react-spinners";

const JobDetailsPage = () => {
  const router = usePathname();
  const jobId = router.split("/")[2];
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

  const currentJob = allJobs?.find((job) => job.photo.includes(jobId));
  const otherJobs = allJobs?.filter((job) => job.photo !== currentJob.photo);
  const relatedJobs = otherJobs?.filter(
    (job) => job.category === currentJob.category
  );
  console.log(relatedJobs);

  const {
    title,
    seller_image,
    seller_name,
    seller_title,
    photo,
    basic,
    standard,
    premium,
    description,
  } = currentJob;

  return (
    <div className="flex gap-10">
      <div className="space-y-5 w-2/3">
        <h1 className="text-2xl font-medium">{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={seller_image}
              alt="seller image"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{seller_name}</h2>
              <h3 className="text-sm font-medium text-gray-500">
                {seller_title}
              </h3>
            </div>
          </div>
          <button className="bg-[#8c52ff] hover:bg-[#7A51CB] text-white font-bold py-2 px-4 rounded ">
            Order Now
          </button>
        </div>
        <img
          src={photo}
          alt="job photo"
          className="w-full rounded-xl h-[500px] object-cover"
        />
        <div>
          <h3 className="text-lg font-medium mb-5">Pricing:</h3>
          <div className="flex gap-20">
            <div>
              <p className="font-medium">Basic</p>
              <h2 className="text-2xl font-bold">${basic}</h2>
            </div>
            <div>
              <p className="font-medium">Standard</p>
              <h2 className="text-2xl font-bold">${standard}</h2>
            </div>
            <div>
              <p className="font-medium">Premium</p>
              <h2 className="text-2xl font-bold">${premium}</h2>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium">Description:</p>
          <p className="text-gray-500">{description}</p>
        </div>
        <button className="bg-[#8c52ff] hover:bg-[#7A51CB] text-white font-bold py-2 px-4 rounded ">
          Order Now
        </button>
      </div>

      <div className="w-1/3">
        <h1 className="text-xl font-medium border-b-2 border-black mb-5">
          Related Jobs
        </h1>
        {relatedJobs.length !== 0 ? (
          relatedJobs.map((job, index) => (
            <RelatedJobsCard
              key={index}
              photo={job.photo}
              title={job.title}
              category={job.category}
              price={job.basic}
            ></RelatedJobsCard>
          ))
        ) : (
          <p>No jobs related to this category</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;
