import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    // Auth service
    "AUTH_URL",
    "SIGNIN_CREDENTIAL_ENDPOINT",
    "REFRESH_TOKEN_ENDPOINT",
    "SIGNIN_GOOGLE_ENDPOINT",
    // Account service
    "GET_ME_ENDPOINT",
    "CONFIRM_EMAIL_ENDPOINT",
    "PATCH_ME_ENDPOINT",
    "RESET_PASSWORD_ENDPOINT",
    "FORGOT_PASSWORD_ENDPOINT",
    "SIGNUP_CREDENTIAL_ENDPOINT",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. \n\n${missingEnvironmentVariables.join(
        "\n",
      )}\n`,
    );
  }
};

export type AccountPathname =
  | "signup"
  | "confirmEmail"
  | "getMe"
  | "google"
  | "patchMe"
  | "forgotPassword"
  | "resetPassword";

export type AuthPathname = "signin" | "refresh" | "signout";

export type ProductPathname =
  | "post"
  | "get"
  | "delete"
  | "put"
  | "uploadimg"
  | "getimg";

export type BackendService = "auth" | "product" | "cart" | "account";

export const getAuthPathSwitch = (pathname: AuthPathname) => {
  const authUrl = process.env.AUTH_URL;
  const makeUrl = (path: string) => new URL(path, authUrl);
  switch (pathname) {
    case "signin":
      return makeUrl(process.env.SIGNIN_CREDENTIAL_ENDPOINT!);
    case "signout":
      return makeUrl(process.env.SIGNOUT_ENDPOINT!);
    case "refresh":
      return makeUrl(process.env.REFRESH_TOKEN_ENDPOINT!);
    default:
      throw new Error("Path must be specified in the config file");
  }
};
export const getAccountPathSwitch = (pathname: AccountPathname) => {
  // TODO: Change this to accounts service url
  const authUrl = process.env.AUTH_URL;
  const makeUrl = (path: string) => new URL(path, authUrl);
  switch (pathname) {
    case "confirmEmail":
      return makeUrl(process.env.CONFIRM_EMAIL_ENDPOINT!);
    case "forgotPassword":
      return makeUrl(process.env.FORGOT_PASSWORD_ENDPOINT!);
    case "resetPassword":
      return makeUrl(process.env.RESET_PASSWORD_ENDPOINT!);
    case "patchMe":
      return makeUrl(process.env.PATCH_ME_ENDPOINT!);
    case "signup":
      return makeUrl(process.env.SIGNUP_CREDENTIAL_ENDPOINT!);
    case "getMe":
      return makeUrl(process.env.GET_ME_ENDPOINT!);
    case "google":
      return makeUrl(process.env.SIGNIN_GOOGLE_ENDPOINT!);
    default:
      throw new Error("Path must be specified in the config file");
  }
};
export const getProductPathSwitch = (pathname: ProductPathname) => {
  const productUrl = process.env.NEXT_URL_PRODUCTS;
  const makeUrl = (path: string) => new URL(path, productUrl);
  switch (pathname) {
    case "get":
      return makeUrl(process.env.CONFIRM_EMAIL_ENDPOINT!);
    case "delete":
      return makeUrl(process.env.SIGNIN_CREDENTIAL_ENDPOINT!);
    case "getimg":
      return makeUrl(process.env.SIGNUP_CREDENTIAL_ENDPOINT!);
    case "post":
      return makeUrl("");
    case "put":
      return makeUrl(process.env.SIGNOUT_ENDPOINT!);
    case "uploadimg":
      return makeUrl(process.env.SIGNOUT_ENDPOINT!);
    default:
      throw new Error("Path must be specified in the config file");
  }
};

export const getApiPath = (pathname: AuthPathname) => {
  const path = getAuthPathSwitch(pathname);
  if (!path)
    throw new Error(`Path ${pathname} must be specified in the config file`);
  return path;
};

type ApiPathByServiceParams =
  | {
      service: "auth";
      pathname: AuthPathname;
    }
  | {
      service: "account";
      pathname: AccountPathname;
    }
  | {
      service: "product";
      pathname: ProductPathname;
    };
export const getApiPathByService = ({
  service,
  pathname,
}: ApiPathByServiceParams) => {
  let path: URL | null = null;
  try {
    switch (service) {
      case "auth": {
        path = getAuthPathSwitch(pathname);
      }
      case "account": {
        path = getAccountPathSwitch(pathname as AccountPathname);
      }
      case "product": {
        path = getProductPathSwitch(pathname as ProductPathname);
      }
    }
  } catch (err) {
    throw new Error(`Path ${pathname} must be specified in the config file`);
  }
  return path;
};
