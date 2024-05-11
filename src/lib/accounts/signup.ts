"use server";

import { getApiPathByService } from "../utils";
import { TSignupFormSchema } from "../zod/signup-schema";

export const signupCred = async (
  credentials: Omit<TSignupFormSchema, "provider">,
) => {
  const newCredentials = {
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    email: credentials.email,
    password: credentials.password,
  };
  try {
    const url = getApiPathByService({
      pathname: "signup",
      service: "account",
    });
    const myRequest = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newCredentials),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!myRequest.ok || myRequest.status < 200 || myRequest.status > 399) {
      const json = await myRequest.json();
      const internalCode =
        json.error?.internal_code?.split(":")?.[1] ?? "unknownError";

      console.log("signupcred", myRequest, json);
      return {
        serverError: internalCode,
        success: false,
      };
    }

    return { success: myRequest.ok };
  } catch (err) {
    console.error(err, "errro!");
  }
  return { success: false, serverError: undefined };
};
