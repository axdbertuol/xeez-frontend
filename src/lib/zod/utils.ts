import { z } from "zod";
import { AuthProvidersEnum } from "@/enum";

export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
export const alphanumericRegex = /^[a-zA-Z0-9]+$/;
export const nameRegex = /^[A-Za-z\s]+$/;

export const schemaAuthBasic = z.object({
  provider: z.enum([AuthProvidersEnum.credentials, AuthProvidersEnum.google]),
});

export const passwordValidate = (errorMsg?: string) =>
  z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim();
export const usernameValidate = ({
  minErr,
  regErr,
}: {
  minErr?: string;
  regErr?: string;
} = {}) =>
  z
    .string()
    .min(5, { message: minErr ?? "InvalidUsernameLength" })
    .regex(alphanumericRegex, {
      message: regErr ?? "InvalidUsernameRegex",
    })
    .trim()
    .optional()
    .or(z.literal(""));

export const nameValidate = ({
  minErr,
  regErr,
}: { minErr?: string; regErr?: string } = {}) =>
  z
    .string()
    .min(2, minErr && { message: minErr })
    .regex(nameRegex, regErr && { message: regErr })
    .trim();
