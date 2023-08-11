const UserPostedJobCard = ({ photo, title, category, price }) => {
  return (
    <div className="border-2 border-gray-100 rounded-lg pr-5 md:px-5 md:py-5 flex gap-5 mb-5">
      <img
        src={photo}
        alt="job image"
        className="w-28 h-24 md:h-full md:w-40 rounded-l-lg md:rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="md:text-xl font-medium line-clamp-1">{title}</p>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Category: {category}
          </p>
        </div>
        <p className="text-sm md:text-lg font-medium">
          Starting price:{" "}
          <span className="text-[#8c52ff] text-xl">${price}</span>
        </p>
      </div>
    </div>
  );
};

export default UserPostedJobCard;
