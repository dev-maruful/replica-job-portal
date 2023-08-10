import Link from "next/link";

const CarouselCard = ({
  jobPhoto,
  sellerImage,
  sellerName,
  sellerTitle,
  jobTitle,
  pricing,
}) => {
  return (
    <div className="rounded-xl border border-r-2 border-b-2 border-l-0 border-gray-200 mx-3 shadow-lg">
      <div className="relative">
        <img
          className="w-full rounded-t-xl h-64 object-cover"
          src={jobPhoto}
          alt="Job photo"
        />
      </div>
      <div className="flex gap-3 p-4">
        <div>
          <img
            src={sellerImage}
            alt="seller image"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="space-y-2">
          <div className="">
            <Link
              href="/sellers/profile"
              className="font-medium hover:underline hover:text-[#8c52ff]"
            >
              {sellerName}
            </Link>
            <p className="text-sm text-gray-500">{sellerTitle}</p>
          </div>
          <h1 className="line-clamp-1 font-medium text-gray-500">{jobTitle}</h1>
          <h1 className="font-semibold">
            Starts from{" "}
            <span className="text-[#8c52ff] text-xl">${pricing}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
