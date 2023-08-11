import Link from "next/link";

const RelatedJobsCard = ({ photo, title, category, price }) => {
  const generateLink = photo.split("/");
  const link = generateLink[generateLink.length - 2];

  return (
    <Link href={`/jobDetails/${link}`}>
      <div className="w-full border-2 rounded-xl flex gap-3 pr-3 mb-5">
        <img src={photo} alt="job photo" className="w-36 rounded-l-xl" />
        <div className="py-2 flex flex-col justify-between">
          <div>
            <h1 className="line-clamp-1 font-medium">{title}</h1>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <p>
            Starting price:{" "}
            <span className="text-xl font-semibold text-[#8c52ff]">
              ${price}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedJobsCard;
