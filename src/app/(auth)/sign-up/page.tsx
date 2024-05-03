"use server";

import Link from "next/link";
import SignupForm from "./SignupForm";

export interface FormData {
  firstName?: string;
  email: string;
  password: string;
}

export default async function Page() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Create an account</h2>
                <p className="md:text-lg">
                  Create an account and start using...
                </p>
              </div>
              <SignupForm />

              <div className="flex gap-x-2 text-sm md:text-base mt-6">
                <p className="text-light dark:text-darkmode-light">
                  I have read and agree to the
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/terms-services"}
                >
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex gap-x-2 text-sm md:text-base mt-2">
                <p className="text-light dark:text-darkmode-light">
                  Have an account?
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
