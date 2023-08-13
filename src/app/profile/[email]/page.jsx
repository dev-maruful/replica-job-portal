"use client";

import UserPostedJobCard from "@/components/UserPostedJobCard";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import GetAllUsers from "@/utils/getAllUsers";
import GetCurrentUser from "@/utils/getCurrentUser";
import { useState } from "react";
import { ClockLoader } from "react-spinners";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { data: currentUser } = GetCurrentUser();
  const { data: allSellerJobs, isLoading, refetch } = GetAllSellerJobs();
  const { data: allUsers } = GetAllUsers();
  const [showInputField, setShowInputField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  let currentUserPostedJobs = allSellerJobs?.filter(
    (job) => job.email === currentUser?.email
  );

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password cannot be empty"),
  });

  const initialValues = {
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    // update current user password on local storage
    currentUser.password = values.password;
    currentUser.confirm_password = values.password;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const findUser = allUsers.find((user) => user.email === currentUser.email);
    const filterOtherUsers = allUsers.filter(
      (user) => user.email !== currentUser.email
    );
    findUser;

    findUser.password = values.password;
    findUser.confirm_password = values.password;

    const newAllUsers = [...filterOtherUsers, findUser];
    localStorage.setItem("users", JSON.stringify(newAllUsers));
    setShowInputField(false);
    toast.success("Password updated successfully");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const jobToDelete = currentUserPostedJobs.find((job) =>
          job.photo.includes(id)
        );

        const newCurrentUserPostedJobs = currentUserPostedJobs.filter(
          (job) => job.photo !== jobToDelete.photo
        );
        currentUserPostedJobs = newCurrentUserPostedJobs;
        const sellerJobsBeforeDelete = allSellerJobs.filter(
          (job) => job.email !== currentUser.email
        );

        const newSellerJobs = [
          ...sellerJobsBeforeDelete,
          ...currentUserPostedJobs,
        ];

        localStorage.setItem("sellerJobs", JSON.stringify(newSellerJobs));
        refetch();
        Swal.fire("Deleted!", "Your job has been deleted.", "success");
      }
    });
  };

  currentUserPostedJobs;

  return (
    <div className="md:flex gap-10 mx-3 md:mx-0">
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
          disabled={showInputField}
          onClick={() => setShowInputField(true)}
          className={`w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded hover:bg-[#7A51CB] ${
            showInputField ? "bg-[#7A51CB]" : ""
          }`}
        >
          Change Password
        </button>
        {showInputField && (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="space-y-3">
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={`${showPassword ? "text" : "password"}`}
                        placeholder="write new password..."
                        className="border-2 rounded-md px-3 py-2 font-medium w-full focus:outline-none focus:border-[#8c52ff]"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <EyeIcon
                        onClick={() => setShowPassword(true)}
                        className={`w-5 h-5 text-gray-500 cursor-pointer absolute top-3 right-3 ${
                          showPassword ? "hidden" : ""
                        }`}
                      ></EyeIcon>
                      <EyeSlashIcon
                        onClick={() => setShowPassword(false)}
                        className={`w-5 h-5 text-gray-500 cursor-pointer absolute top-3 right-3 ${
                          !showPassword ? "hidden" : ""
                        }`}
                      ></EyeSlashIcon>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white rounded-md px-3 py-2 font-medium bg-[#8c52ff] hover:bg-[#7A51CB]"
                      >
                        {isSubmitting ? "Updating..." : "Update"}
                      </button>
                      <button
                        onClick={() => setShowInputField(false)}
                        className="border-gray-400 border-2 rounded-md px-3 py-2 font-medium hover:text-gray-500 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
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
              handleDelete={handleDelete}
              email={currentUser.email}
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
