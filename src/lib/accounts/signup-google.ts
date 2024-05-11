import { revalidatePath } from "next/cache";
import { getApiPathByService } from "../utils";
import { TGoogleSigninSchema } from "../zod/signin-schema";
import { HTTP_CODES_ENUM } from "@/enum";
import { LoginResponse, InternalErrorResponse } from "../shopify/types";

export const signinGoogle = async ({
  idToken,
}: Omit<TGoogleSigninSchema, "provider">) => {
  const url = getApiPathByService({ pathname: "google", service: "account" });
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ idToken, provider: "google" }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const json = (await response.json()) as LoginResponse & InternalErrorResponse;

  const success = response.status === HTTP_CODES_ENUM.OK;
  if (success) {
    // await setAuthCookies({
    //   token: json.token,
    //   user: json.user,
    //   refreshToken: json.refreshToken,
    //   tokenExpires: json.tokenExpires,
    // });
    revalidatePath("/");
    return { success: success };
  }

  return {
    success,
    serverError: json.error.internal_code,
  };
};
