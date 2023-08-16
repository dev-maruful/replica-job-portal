"use client";

import CarouselCard from "@/components/CarouselCard";
import CategoryTitle from "@/components/CategoryTitle";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ClockLoader } from "react-spinners";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { data: sellerJobs, isLoading } = GetAllSellerJobs();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "Frontend Development",
    "Backend Development",
    "Full-stack Development",
    "UI/UX Design",
    "Digital Marketing",
    "Data Entry",
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

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

  return (
    <main className="space-y-10">
      {/* Sort button functionality */}
      <div className="relative flex flex-col items-end mr-3 md:mr-0">
        <button
          onClick={toggleDropdown}
          className="bg-[#8c52ff] text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-32"
        >
          <span>Filter By</span>
          {isDropdownOpen ? (
            <ChevronUpIcon className="h-6 w-6"></ChevronUpIcon>
          ) : (
            <ChevronDownIcon className="h-6 w-6"></ChevronDownIcon>
          )}
        </button>
        {isDropdownOpen && (
          <div className="absolute top-11 bg-white border rounded shadow-lg w-60 z-50">
            <div>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Frontend Development"
                  checked={selectedOptions.includes("Frontend Development")}
                  onChange={() => handleOptionToggle("Frontend Development")}
                />
                Frontend Development
              </label>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Backend Development"
                  checked={selectedOptions.includes("Backend Development")}
                  onChange={() => handleOptionToggle("Backend Development")}
                />
                Backend Development
              </label>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Full-stack Development"
                  checked={selectedOptions.includes("Full-stack Development")}
                  onChange={() => handleOptionToggle("Full-stack Development")}
                />
                Full-stack Development
              </label>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="UI/UX Design"
                  checked={selectedOptions.includes("UI/UX Design")}
                  onChange={() => handleOptionToggle("UI/UX Design")}
                />
                UI/UX Design
              </label>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Digital Marketing"
                  checked={selectedOptions.includes("Digital Marketing")}
                  onChange={() => handleOptionToggle("Digital Marketing")}
                />
                Digital Marketing
              </label>
              <label className="flex gap-2 w-full px-4 py-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  value="Data Entry"
                  checked={selectedOptions.includes("Data Entry")}
                  onChange={() => handleOptionToggle("Data Entry")}
                />
                Data Entry
              </label>
            </div>
          </div>
        )}
      </div>

      {/* frontend carousel */}
      {frontendJobs?.length !== 0 &&
        selectedOptions.includes("Frontend Development") && (
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
                  email={item.email}
                ></CarouselCard>
              ))}
            </Carousel>
          </div>
        )}

      {/* backend carousel */}
      {backendJobs?.length !== 0 &&
        selectedOptions.includes("Backend Development") && (
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
                  email={item.email}
                ></CarouselCard>
              ))}
            </Carousel>
          </div>
        )}

      {/* full-stack carousel */}
      {fullStackJobs?.length !== 0 &&
        selectedOptions.includes("Full-stack Development") && (
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
                  email={item.email}
                ></CarouselCard>
              ))}
            </Carousel>
          </div>
        )}

      {/* UI/UX Design carousel */}
      {uiUxJobs?.length !== 0 && selectedOptions.includes("UI/UX Design") && (
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
                email={item.email}
              ></CarouselCard>
            ))}
          </Carousel>
        </div>
      )}

      {/* Digital Marketing carousel */}
      {digitalMarketingJobs?.length !== 0 &&
        selectedOptions.includes("Digital Marketing") && (
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
                  email={item.email}
                ></CarouselCard>
              ))}
            </Carousel>
          </div>
        )}

      {/* Data Entry carousel */}
      {dataEntryJobs?.length !== 0 &&
        selectedOptions.includes("Data Entry") && (
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
                  email={item.email}
                ></CarouselCard>
              ))}
            </Carousel>
          </div>
        )}
    </main>
  );
}
