"use client";

import { AuthProvidersEnum } from "@/enum";
import {
  CredentialResponse,
  GoogleCredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import { useFormState, useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { signup } from "./signup-form-action";

export interface FormData {
  firstName?: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [state, action] = useFormState(signup, undefined);

  async function handleGoogleAuthSubmit({ credential }: CredentialResponse) {
    {
      if (!credential) {
        console.error("Could not find GoogleLogin credential");
        return;
      }
      // setFieldValue("idToken", () => credential);
      // setFieldValue("provider", () => AuthProvidersEnum.google);
      // await handleSubmit();
    }
  }

  return (
    <form action={action} className="flex flex-col gap-2">
      <div>
        <label className="form-label">First Name</label>
        <input
          name="firstName"
          className="form-input"
          placeholder="Enter your name"
          required={true}
          type="text"
        />
        {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
      </div>
      <div>
        <label className="form-label">Last Name</label>
        <input
          name="lastName"
          className="form-input"
          placeholder="Enter your last name"
          required={true}
          type="text"
        />
        {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
      </div>
      <div>
        <label className="form-label">Username</label>
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
          autoComplete="email"
          required={true}
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
          autoComplete="new-password"
          required={true}
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
          required={true}
          type="password"
        />
        {state?.errors?.password2 && <p>{state.errors.password2}</p>}
      </div>

      <SignUpBtn />
      <span className="text-center font-thin text-sm">
        Or use one of our providers:
      </span>
      <div className="flex  py-2 items-center dark:bg-darkmode-light bg-neutral-300 place-content-center gap-2 rounded-lg">
        <GoogleLogin
          onSuccess={handleGoogleAuthSubmit}
          size="large"
          ux_mode="popup"
          type="standard"
          theme={"filled_black"}
          logo_alignment="center"
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
      className="btn btn-primary md:text-lg md:font-medium w-full md:w-[15vw] md:self-center mt-10"
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
