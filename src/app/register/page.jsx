"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsUpload } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import addUser from "@/utils/addUser";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import GetCurrentUser from "@/utils/getCurrentUser";

const RegisterForm = () => {
  const router = useRouter();
  const { refetch } = GetCurrentUser();

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=10d9b016211667099c90a16487153306`;

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "buyer", // Default role is set to "buyer"
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    const formData = new FormData();
    formData.append("image", values.image);

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
      .catch((err) => console.log(err));
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
              <label className="block mb-2">Who you are?</label>
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
      <div className="mt-2 text-sm">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="underline hover:text-[#8c52ff] hover:cursor-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
