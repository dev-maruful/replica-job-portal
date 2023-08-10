"use client";

import UserPostedJobCard from "@/components/UserPostedJobCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import GetAllUsers from "@/utils/getAllUsers";
import GetCurrentUser from "@/utils/getCurrentUser";
import { useState } from "react";
import { ClockLoader } from "react-spinners";

const ProfilePage = () => {
  const { data: currentUser } = GetCurrentUser();
  const { data: sellerJobs, isLoading } = GetAllSellerJobs();
  const { data: allUsers } = GetAllUsers();
  const [showInputField, setShowInputField] = useState(false);

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

  const currentUserPostedJobs = sellerJobs?.filter(
    (job) => job.email === currentUser?.email
  );

  const handleChangePass = () => {
    console.log("hello world");
    setShowInputField(true);
  };

  return (
    <div className="md:flex gap-10 mx-5 md:mx-0">
      <div className="space-y-3 md:w-1/4 md:sticky top-0 mb-10 md:mb-0">
        <div className="flex justify-center items-center md:block">
          <img
            src={currentUser?.image}
            alt="User image"
            className="w-72 h-72 rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{currentUser?.name}</h1>
          <p className="text-gray-500 font-medium">{currentUser?.user_title}</p>
        </div>
        <div>
          <p className="font-medium">Role: {currentUser?.role}</p>
          <p className="font-medium">Email: {currentUser?.email}</p>
        </div>
        <button
          onClick={handleChangePass}
          className="w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-[#7A51CB]"
        >
          Change Password
        </button>
      </div>
      <div className="md:w-3/4 ">
        <h1 className="text-2xl font-semibold mb-5">Your posted jobs</h1>
        {currentUserPostedJobs?.length !== 0 ? (
          currentUserPostedJobs?.map((job, index) => (
            <UserPostedJobCard
              key={index}
              photo={job.photo}
              title={job.title}
              category={job.category}
              price={job.basic}
            ></UserPostedJobCard>
          ))
        ) : (
          <p>No jobs posted yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
