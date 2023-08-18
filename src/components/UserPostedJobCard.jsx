import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const UserPostedJobCard = ({
  photo,
  title,
  category,
  price,
  handleDelete,
  email,
  hidden,
}) => {
  const jobId = photo.split("/")[3];

  return (
    <div className="border-2 border-gray-100 rounded-lg px-5 md:px-5  md:py-5 flex gap-5 mb-5">
      <Link href={`/job-details/${jobId}`}>
        <img
          src={photo}
          alt="job image"
          className="hidden md:block md:h-full md:w-40 rounded-l-lg md:rounded-lg object-cover"
        />
      </Link>
      <div className="flex flex-col justify-between w-full py-3 md:py-0">
        <div>
          <Link
            href={`/job-details/${jobId}`}
            className="hover:text-[#8c52ff] hover:underline"
          >
            <p className="md:text-xl font-medium line-clamp-1">{title}</p>
          </Link>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Category: {category}
          </p>
        </div>
        <div className="md:flex items-center justify-between space-y-3">
          <p className="text-sm md:text-lg font-medium">
            Starting price:{" "}
            <span className="text-[#8c52ff] text-xl">${price}</span>
          </p>
          <div className={`space-x-3 flex items-center ${hidden && "hidden"}`}>
            <Link href={`/profile/${email}/update-job/${jobId}`}>
              <button className="text-white rounded-md px-3 py-2 font-medium bg-[#8c52ff] hover:bg-[#7A51CB] flex items-center gap-1">
                <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
                <span>Update</span>
              </button>
            </Link>
            <button
              onClick={() => handleDelete(jobId)}
              className="border-gray-400 border-2 rounded-md px-3 py-2 font-medium hover:text-red-500 hover:bg-gray-100 flex items-center gap-1"
            >
              <TrashIcon className="w-5 h-5"></TrashIcon> <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostedJobCard;
