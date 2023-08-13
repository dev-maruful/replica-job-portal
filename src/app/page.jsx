"use client";

import CarouselCard from "@/components/CarouselCard";
import CategoryTitle from "@/components/CategoryTitle";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ClockLoader } from "react-spinners";

export default function Home() {
  const { data: sellerJobs, isLoading } = GetAllSellerJobs();

  const frontendJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "Frontend Development"
  );
  const backendJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "Backend Development"
  );
  const fullStackJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "Full-stack Development"
  );
  const uiUxJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "UI/UX Design"
  );
  const digitalMarketingJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "Digital Marketing"
  );
  const dataEntryJobs = sellerJobs?.filter(
    (jobs) => jobs.category === "Data Entry"
  );

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

  frontendJobs;

  return (
    <main className="space-y-10">
      {/* frontend carousel */}
      {frontendJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="Frontend Development"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {frontendJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* backend carousel */}
      {backendJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="Backend Development"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {backendJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* full-stack carousel */}
      {fullStackJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="Full-stack Development"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {fullStackJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* UI/UX Design carousel */}
      {uiUxJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="UI/UX Design"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {uiUxJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* Digital Marketing carousel */}
      {digitalMarketingJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="Digital Marketing"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {digitalMarketingJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* Data Entry carousel */}
      {dataEntryJobs?.length !== 0 && (
        <div>
          <CategoryTitle title="Data Entry"></CategoryTitle>

          <Carousel responsive={responsive} className="z-0">
            {dataEntryJobs?.map((item, index) => (
              <CarouselCard
                key={index}
                jobPhoto={item.photo}
                jobTitle={item.title}
                sellerImage={item.seller_image}
                sellerName={item.seller_name}
                sellerTitle={item.seller_title}
                pricing={item.basic}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}
    </main>
  );
}
