"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import addUser from "@/utils/addUser";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import GetCurrentUser from "@/utils/getCurrentUser";
import { FaFileUpload } from "react-icons/fa";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

const RegisterForm = () => {
  const router = useRouter();
  const { refetch } = GetCurrentUser();
  const [imagePreview, setImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=10d9b016211667099c90a16487153306`;

  const initialValues = {
    name: "",
    user_title: "",
    email: "",
    password: "",
    confirm_password: "",
    image: "",
    role: "buyer", // Default role is set to "buyer"
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    user_title: Yup.string().required("Title is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
    role: Yup.string().required("Role is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    const formData = new FormData();
    formData.append("image", values.image);

    formData;

    // host image to image hosting server
    axios
      .post(image_hosting_url, formData)
      .then((res) => {
        if (values.image) {
          values.image = res?.data?.data?.display_url;

          // add user to local storage
          const saveUser = addUser(values);
          if (saveUser?.status === "success") {
            resetForm();
            setImagePreview("");
            router.push("/");
            toast.success(saveUser.message);
            localStorage.setItem("currentUser", JSON.stringify(values));
            localStorage.setItem("isLoggedIn", true);
            refetch();
          } else if (saveUser?.status === "failed") {
            toast.error(saveUser.message);
          }
        }
      })
      .catch((err) => err);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    file && setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg md:shadow-lg">
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
            <div className="md:flex gap-5">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#8c52ff]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="user_title" className="block mb-2 font-medium">
                  Title
                </label>
                <Field
                  type="text"
                  id="user_title"
                  name="user_title"
                  placeholder="your title..."
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#8c52ff]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="your email address..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#8c52ff]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="md:flex gap-5 relative">
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Password
                </label>
                <Field
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  name="password"
                  placeholder="create password..."
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#8c52ff]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className={`w-5 h-5 text-gray-500 cursor-pointer absolute top-11 right-3 md:left-56 ${
                    showPassword ? "hidden" : ""
                  }`}
                ></EyeIcon>
                <EyeSlashIcon
                  onClick={() => setShowPassword(false)}
                  className={`w-5 h-5 text-gray-500 cursor-pointer absolute top-11 right-3 md:left-56 ${
                    !showPassword ? "hidden" : ""
                  }`}
                ></EyeSlashIcon>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 font-medium"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="confirm password..."
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#8c52ff]"
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Who you are?</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <Field
                    type="radio"
                    name="role"
                    value="buyer"
                    className="mr-1"
                  />
                  Buyer
                </label>
                <label>
                  <Field
                    type="radio"
                    name="role"
                    value="seller"
                    className="mr-1"
                  />
                  Seller
                </label>
              </div>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 font-medium">
                Profile Image
              </label>

              <label
                htmlFor="image"
                className="border-dotted border-2 border-gray-400 p-4 flex flex-col items-center justify-center cursor-pointer rounded"
              >
                <div className="flex flex-row-reverse items-center gap-2">
                  <span className="text-gray-500 mb-2">
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </span>
                  <FaFileUpload className="text-[#8c52ff] text-2xl mb-2" />
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </label>
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
      <div className="mt-2 text-sm text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="underline hover:text-[#8c52ff] hover:cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
