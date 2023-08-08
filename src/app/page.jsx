"use client";

import GetSellerFrontend from "@/utils/getSellerFrontend";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ClockLoader } from "react-spinners";

export default function Home() {
  const { data, isLoading } = GetSellerFrontend();
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

  console.log(data[0][0]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
    <main className="">
      <div>
        <h1 className="text-xl font-semibold mb-3">Frontend Development</h1>
        <Carousel responsive={responsive} showDots={true}>
          {data &&
            data[0].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-r-2 border-b-2 border-gray-200 mr-5"
              >
                <img
                  className="w-full rounded-t-xl mb-3"
                  src={item.photo}
                  alt=""
                />
                <div className="flex items-center gap-3 mb-3 pl-2">
                  <img
                    src={item.seller_image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <h1 className="font-medium">{item.seller_name}</h1>
                </div>
                <h1 className="line-clamp-1 font-medium px-2 mb-2">
                  {item.title}
                </h1>
                <h1 className="pl-2 font-semibold mb-3">
                  Starts from ${item.pricing}
                </h1>
              </div>
            ))}
        </Carousel>
      </div>
    </main>
  );
}
