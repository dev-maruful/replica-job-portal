"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    console.log(values);
  };

  return (
    <div className="max-w-md md:mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8c52ff] text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-[#7A51CB]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-2 text-sm">
        <p>
          Don't have an account?{" "}
          <Link href="/register">
            <span className="underline hover:text-[#8c52ff] hover:cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
