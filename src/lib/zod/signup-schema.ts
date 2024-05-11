import { z } from "zod";
import { credSigninSchema } from "./signin-schema";
import {
  nameRegex,
  passwordValidate,
  schemaAuthBasic,
  usernameValidate,
} from "./utils";

export const SignupFormSchema = credSigninSchema
  .merge(
    z.object({
      firstName: z
        .string()
        .min(2, "NameMinLength")
        .regex(nameRegex, "NameRegex")
        .transform(
          (arg) =>
            arg[0].toLocaleUpperCase() + arg.substring(1).toLocaleLowerCase(),
        ),
      lastName: z
        .string()
        .min(2, "NameMinLength")
        .regex(nameRegex, "NameRegex")
        .transform(
          (arg) =>
            arg[0].toLocaleUpperCase() + arg.substring(1).toLocaleLowerCase(),
        ),
      username: usernameValidate(),
      password: passwordValidate(),
      password2: z.string(),
    }),
  )
  .merge(schemaAuthBasic)
  .refine(
    (values) => values.password === values.password2,
    () => ({ message: `PasswordsMustMatch`, path: ["password2"] }),
  );

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;
export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success: false;
    }
  | {
      success: true;
    }
  | undefined;
export type GoogleSignFormState =
  | {
      errors?: {
        idToken?: string[];
        provider?: string;
      };
      message?: string;
      success: false;
    }
  | {
      success: true;
    }
  | undefined;
