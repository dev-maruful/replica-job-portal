"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsUpload } from "react-icons/bs";

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      setImagePreview("");
    }, 1000);

    console.log(values);
  };

  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {imagePreview && (
        <div className="flex items-center justify-center mb-2">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-2"
          />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block mb-2">
                Profile Image
              </label>

              <label
                htmlFor="image"
                className={`w-full px-4 py-2 border rounded cursor-pointer flex items-center justify-center bg-[#8c52ff] text-white hover:bg-[#7A51CB] focus:outline-none`}
              >
                <BsUpload className="mr-2" />{" "}
                {imagePreview ? "Change Image" : "Upload Image"}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                className="hidden"
              />
              {/* <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              /> */}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-[#7A51CB]"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
