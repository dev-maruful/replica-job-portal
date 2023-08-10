const UserPostedJobCard = ({ photo, title, category, price }) => {
  return (
    <div className="border-2 border-gray-100 rounded-lg px-5 md:px-10 py-5 flex gap-5 mb-5">
      <img
        src={photo}
        alt="job image"
        className="w-20 md:w-40 rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xl font-medium line-clamp-1">{title}</p>
          <p className="text-gray-500 font-medium">Job category: {category}</p>
        </div>
        <p className="text-lg font-medium">
          Starting price:{" "}
          <span className="text-[#8c52ff] text-xl">${price}</span>
        </p>
      </div>
    </div>
  );
};

export default UserPostedJobCard;
