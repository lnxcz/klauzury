import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormItem } from "../modules/auth/FormItem";

type Inputs = {
  username: string;
  email: string;
  password: string;
  remember: boolean;
};

const Login: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    //TODO: fix type
    setLoading(true);
    fetch("http://localhost:4000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (!res.success) {
          setError(res.message);
        } else {
          switch (data.remember) {
            case true:
              localStorage.setItem("token", res.token);
              break;
            case false:
              sessionStorage.setItem("token", res.token);
              break;
          }
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden px-3 py-12">
          <div className="max-w-md w-full space-y-8 p-5">
            <div>
              <h2 className="text-left text-3xl font-extrabold text-gray-900">
                Welcome to Joe!
              </h2>
              <p className="mt-1 text-left text-sm leading-2 font-semibold text-gray-600">
                By logging in you agree to our terms of service and privacy
                policy.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <FormItem
                  register={register}
                  value="Username"
                  name="username"
                  type="text"
                  corner="t"
                />
                <FormItem
                  register={register}
                  value="Email"
                  name="email"
                  corner="n"
                />
                <FormItem
                  register={register}
                  value="Password"
                  name="password"
                  corner="b"
                />

              </div>

              <div>
                <div className="flex items-center">
                  <input
                    {...register("remember")}
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className={` group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus
                  ${loading
                      ? "cursor-not-allowed bg-indigo-400"
                      : "hover:bg-indigo-700"
                    }`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-indigo-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  Sign up
                </button>
                <div className="mt-2 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      Sign in
                    </a>
                  </Link>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
