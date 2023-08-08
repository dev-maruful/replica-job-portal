"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsUpload } from "react-icons/bs";
import addSellerJob from "@/utils/addSellerJob";
import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import axios from "axios";
import { toast } from "react-hot-toast";
import GetCurrentUser from "@/utils/getCurrentUser";
import Image from "next/image";

const PostJobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  pricing: Yup.string().required("Pricing is required"),
  description: Yup.string().required("Description is required"),
  photo: Yup.mixed().required("Photo is required"),
});

const jobCategories = [
  "Frontend Development",
  "Backend Development",
  "Full-stack Development",
  "UI/UX Design",
  "Digital Marketing",
  "Data Entry",
];

const PostJobForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const { refetch } = GetAllSellerJobs();
  const { data } = GetCurrentUser();

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=10d9b016211667099c90a16487153306`;

  const initialValues = {
    title: "",
    category: "",
    pricing: "",
    description: "",
    photo: null,
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    const formData = new FormData();
    formData.append("image", values.photo);

    console.log(formData, values);

    // host image to image hosting server

    axios
      .post(image_hosting_url, formData)
      .then((res) => {
        if (values.photo) {
          values.photo = res?.data?.data?.display_url;
          values.pricing = parseFloat(values.pricing);
          values.email = data.email;
          values.seller_name = data.name;
          values.seller_image = data.image;

          // add post to local storage
          const saveJobPost = addSellerJob(values);
          if (saveJobPost?.status === "success") {
            resetForm();
            setImagePreview("");
            toast.success(saveJobPost.message);
            refetch();
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("photo", file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Post A Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={PostJobSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-1">
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
              <label htmlFor="category" className="block font-semibold mb-1">
                Job Category
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className="w-full p-2 border rounded"
              >
                <option value="">Select a category</option>
                {jobCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pricing" className="block font-semibold mb-1">
                Pricing
              </label>
              <Field
                type="text"
                id="pricing"
                name="pricing"
                className="w-full p-2 border rounded"
                placeholder="write in dollar amount ($)"
              />
              <ErrorMessage
                name="pricing"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-2 border rounded"
                placeholder="job description..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            {imagePreview && (
              <div className="flex items-center justify-center mb-2">
                <Image src={imagePreview} width={200} height={100}></Image>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="image" className="block font-semibold mb-1">
                Job Image
              </label>

              <label
                htmlFor="photo"
                className={`w-full px-4 py-2 border rounded cursor-pointer flex items-center justify-center bg-[#8c52ff] text-white hover:bg-[#7A51CB] focus:outline-none`}
              >
                <BsUpload className="mr-2" />{" "}
                {imagePreview ? "Change Photo" : "Upload Photo"}
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="photo/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                className="hidden"
              />
              <ErrorMessage
                name="photo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-[#7A51CB]"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostJobForm;
