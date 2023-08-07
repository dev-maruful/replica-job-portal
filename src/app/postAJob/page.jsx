"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsUpload } from "react-icons/bs";

const PostJobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  pricing: Yup.string().required("Pricing is required"),
  description: Yup.string().required("Description is required"),
  photo: Yup.string().required("Photo is required"),
});

const jobCategories = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Video Editing",
  // Add more categories as needed
];

const PostJobForm = () => {
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = (values, { setSubmitting }) => {
    // Submit logic here
    console.log(values);
    setSubmitting(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Post A Job</h1>
      <Formik
        initialValues={{
          title: "",
          category: "",
          pricing: "",
          description: "",
          photo: "",
        }}
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
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2">
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostJobForm;
