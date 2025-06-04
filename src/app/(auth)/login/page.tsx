"use client";

import { apiCall } from "@/utils/services/request";
import { ILogInFormValues } from "@/utils/types/auth";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookie from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROLE, ROUTES } from "@/utils/constant";
import { InitialLogInValues } from "@/utils/helper/initialValues";
import { LogInFormSchema } from "@/utils/helper/schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import FormikSelectField from "@/components/common/FormikSelectField";
import Logo from "@/components/common/Logo";
import FormikTextField from "@/components/common/FormikTextField";

const LogInPage = () => {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogInSubmit = async (
    values: ILogInFormValues,
    actions: FormikHelpers<ILogInFormValues>
  ) => {
    actions.setSubmitting(true);

    // const response = await apiCall({
    //   endPoint: API_ROUTES.AUTH.LOGIN,
    //   method: "POST",
    //   body: values,
    // });

    actions.setSubmitting(false);
    Cookie.set(
      "authToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXZlbnQgTWFuYWdlciIsImVtYWlsIjoiYWRtaW5AZXZlbnRseS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDkwMjUwMTksImV4cCI6MTc0OTExMTQxOX0.CF9-y4zxL8MTOnBf2Tch-_zW8rBhGmY7mOLyKdndnhQ"
    );
    if (values.role) {
      Cookie.set("role", values.role);
    }

    // if (response.success) {
    //   const { token, role } = response.data;

    //   Cookie.set("authToken", token);

    //   if (rememberMe) {
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("role", role);
    //   } else {
    //     sessionStorage.setItem("token", token);
    //     sessionStorage.setItem("role", role);
    //   }

    //   if (role === "admin") {
    //     router.push(ROUTES.ADMIN.DASHBOARD);
    //   }
    //   toast.success(response.message);
    // } else {
    //   toast.error(response.message || "Login failed. Please try again.");
    // }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl grid lg:grid-cols-2 overflow-hidden">
        {/* Left: Form */}

        <div className="p-8 lg:p-16 flex flex-col justify-between h-full">
          {/* Top Section */}

          <div>
            <div className="mb-10">
              <Logo />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>

              <p className="text-sm text-gray-500">
                Enter your email and password to access your account.
              </p>
            </div>

            <Formik
              initialValues={InitialLogInValues}
              validationSchema={LogInFormSchema}
              onSubmit={handleLogInSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <FormikTextField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />

                  <FormikTextField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-6 w-6 text-gray-500 mt-1" />
                        ) : (
                          <EyeIcon className="h-6 w-6 text-gray-500 mt-1" />
                        )}
                      </button>
                    }
                  />

                  <FormikSelectField
                    name="role"
                    options={[
                      { label: ROLE.Admin, value: ROLE.Admin },
                      { label: ROLE.HOD, value: ROLE.HOD },
                      { label: ROLE.Teacher, value: ROLE.Teacher },
                      {
                        label: ROLE.AssistantTeachers,
                        value: ROLE.AssistantTeachers,
                      },
                      { label: ROLE.Students, value: ROLE.Students },
                    ]}
                  />

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-[#4F46E5] h-4 w-4"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      Remember Me
                    </label>

                    <Link
                      href="forgot-password"
                      className="text-[#4F46E5] hover:underline font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    disabled={isSubmitting}
                    className="w-full py-3 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Logging In..." : "Log In"}
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link
                      href={ROUTES.SIGN_UP}
                      className="text-[#4F46E5] font-medium hover:underline"
                    >
                      Register Now.
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>

          <p className="text-xs text-gray-400 text-center mt-10">
            Copyright © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Right: Illustration */}

        <div className="relative w-full h-full bg-[#fff] text-white">
          {/* <Image
            src={LOG_IN_IMAGE_BANNER_LINK}
            alt="dashboard preview"
            fill
            className="object-contain p-8"
          /> */}
          <Logo />
        </div>
      </div>
    </section>
  );
};

export default LogInPage;
