"use client";

import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import { usePathname, useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import GetCurrentUser from "@/utils/getCurrentUser";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title cannot be less than 10 characters")
    .max(100, "Title cannot be more than 10 character")
    .required("Title is required"),
  basic: Yup.number()
    .required("Pricing is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  standard: Yup.number()
    .required("Pricing is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  premium: Yup.number()
    .required("Pricing is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  description: Yup.string().required("Description is required"),
});

const UpdateJobPage = () => {
  const router = usePathname();
  const navigate = useRouter();
  const { data: allJobs, isLoading, refetch } = GetAllSellerJobs();
  const { data: currentUser } = GetCurrentUser();
  const jobId = router.split("/")[4];

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

  const jobToUpdate = allJobs?.find((job) => job.photo.includes(jobId));
  const otherJobs = allJobs?.filter((job) => job.photo !== jobToUpdate.photo);

  const initialValues = {
    title: jobToUpdate.title,
    basic: jobToUpdate.basic,
    standard: jobToUpdate.standard,
    premium: jobToUpdate.premium,
    description: jobToUpdate.description,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    jobToUpdate.title = values.title;
    jobToUpdate.basic = values.basic;
    jobToUpdate.standard = values.standard;
    jobToUpdate.premium = values.premium;
    jobToUpdate.description = values.description;

    const newAllJobs = [...otherJobs, jobToUpdate];

    localStorage.setItem("sellerJobs", JSON.stringify(newAllJobs));
    navigate.push(`/profile/${currentUser.email}`);
    toast.success("Job updated successfully");
    refetch();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">
                Job Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border rounded"
                placeholder="job title..."
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pricing" className="block font-medium">
                Pricing
              </label>
              <p className="text-sm mb-1 text-gray-500">
                write in dollar ($) amount
              </p>
              <div className="flex gap-3">
                <div>
                  <Field
                    type="text"
                    id="basic"
                    name="basic"
                    className="w-full p-2 border rounded"
                    placeholder="Basic"
                  />
                  <ErrorMessage
                    name="basic"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    id="standard"
                    name="standard"
                    className="w-full p-2 border rounded"
                    placeholder="Standard"
                  />
                  <ErrorMessage
                    name="standard"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    id="premium"
                    name="premium"
                    className="w-full p-2 border rounded"
                    placeholder="Premium"
                  />
                  <ErrorMessage
                    name="premium"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full h-36 p-4 border rounded"
                placeholder="job description..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-[#7A51CB]"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateJobPage;
