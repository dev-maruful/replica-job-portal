"use client";

import CarouselCard from "@/components/CarouselCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Carousel from "react-multi-carousel";
import { ClockLoader } from "react-spinners";
import "react-multi-carousel/lib/styles.css";
import GetCurrentUser from "@/utils/getCurrentUser";

const JobDetailsPage = () => {
  const router = usePathname();
  const jobId = router.split("/")[2];
  const { data: allJobs, isLoading } = GetAllSellerJobs();
  const { data: currentUser } = GetCurrentUser();

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
  const otherJobsByThisSeller = allJobs.filter(
    (job) => job.email === currentJob.email
  );

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
    email,
  } = currentJob;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-3 md:mx-0 space-y-10">
      <div className="space-y-5 mb-10 md:mb-0">
        <h1 className="text-2xl font-medium">{title}</h1>
        <div className="md:flex gap-10">
          <div className="md:w-2/3 space-y-5 mb-10 md:mb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={seller_image}
                  alt="seller image"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <Link href={`/sellers/profile/${email}`}>
                    <h2 className="text-xl font-semibold hover:underline hover:text-[#8c52ff]">
                      {seller_name}
                    </h2>
                  </Link>
                  <h3 className="text-sm font-medium text-gray-500">
                    {seller_title}
                  </h3>
                </div>
              </div>
            </div>
            <img
              src={photo}
              alt="job photo"
              className="w-full rounded-xl h-64 md:h-[480px] object-cover"
            />
          </div>
          <div className="md:w-1/3 space-y-5">
            <div>
              <h3 className="text-lg font-medium mb-3">Pricing:</h3>
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
              <p className="text-lg font-medium mb-3">Description:</p>
              <p className="text-gray-500">{description}</p>
            </div>
            <Link href={`/jobDetails/${jobId}/order`}>
              <button
                disabled={email === currentUser?.email || !currentUser}
                className={`bg-[#8c52ff] hover:bg-[#7A51CB] text-white font-bold py-2 px-4 rounded mt-5 ${
                  email === currentUser?.email || !currentUser
                    ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
              >
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {otherJobsByThisSeller.length !== 0 && (
        <div>
          <h1 className="text-xl font-medium mb-3">
            Other Jobs By This Seller
          </h1>
          <div>
            <Carousel responsive={responsive} className="z-0">
              {otherJobsByThisSeller.map((job, index) => (
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
            </Carousel>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-xl font-medium mb-3">
          Related Jobs To This Category
        </h1>
        {relatedJobs.length !== 0 ? (
          <div>
            <Carousel responsive={responsive} className="z-0">
              {relatedJobs.map((job, index) => (
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
            </Carousel>
          </div>
        ) : (
          <p>No jobs related to this category</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;
