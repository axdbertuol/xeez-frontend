"use client";

import { AuthProvidersEnum } from "@/enum";
import { CustomerError } from "@/lib/shopify/types";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { signup } from "./signup-action";

export interface FormData {
  firstName?: string;
  email: string;
  password: string;
}
const initialSignupFormValues = {
  email: "",
  password: "",
  password2: "",
  idToken: "",
  success: false,
  provider: AuthProvidersEnum.credentials,
  formName: "signup",
};
const SignUp = () => {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label className="form-label">Name</label>
        <input
          name="firstName"
          className="form-input"
          placeholder="Enter your name"
          type="text"
        />
        {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
      </div>
      <div>
        <label className="form-label">Name</label>
        <input
          name="lastName"
          className="form-input"
          placeholder="Enter your last name"
          type="text"
        />
        {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
      </div>
      <div>
        <label className="form-label">Name</label>
        <input
          name="username"
          className="form-input"
          placeholder="Enter a username"
          required={false}
          type="text"
        />
        {state?.errors?.username && <p>{state.errors.username}</p>}
      </div>
      <div>
        <label className="form-label mt-8">Email Address</label>
        <input
          name="email"
          className="form-input"
          placeholder="Type your email"
          type="email"
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>

      <div>
        <label className="form-label mt-8">Password</label>
        <input
          name="password"
          className="form-input"
          placeholder="********"
          type="password"
        />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <label className="form-label mt-8">Confirm Password</label>
        <input
          name="password2"
          className="form-input"
          placeholder="********"
          type="password"
        />
        {state?.errors?.password2 && <p>{state.errors.password2}</p>}
      </div>

      <SignUpBtn />
      <span className="text-center font-thin text-sm">
        Or sign up with one of our providers:
      </span>
      <div className="flex w-full py-2 items-center dark:bg-white bg-neutral-300 place-content-center gap-2 rounded-lg">
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            if (!credential) {
              console.error("Could not find GoogleLogin credential");
              return;
            }
            // setFieldValue("idToken", () => credential);
            // setFieldValue("provider", () => AuthProvidersEnum.google);
            // await handleSubmit();
          }}
          // locale={getLocaleWebPattern(locale ?? defaultLocale)}
          size="large"
          ux_mode="popup"
          type="standard"
          shape="circle"
          text={"signup_with"}
        />
      </div>
    </form>
  );
};

export default SignUp;
function SignUpBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary md:text-lg md:font-medium w-full mt-10"
      aria-disabled={pending}
    >
      {pending ? (
        <BiLoaderAlt className={`animate-spin mx-auto`} size={26} />
      ) : (
        "Sign Up"
      )}
    </button>
  );
}
