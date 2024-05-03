import { z } from "zod";
import { schemaAuthBasic, strongPasswordRegex } from "./utils";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(strongPasswordRegex, { message: "PasswordRegexInvalid" }),
    password2: z.string(),
  })
  .refine(
    (values) => values.password === values.password2,
    () => ({ message: `PasswordsMustMatch`, path: ["password2"] }),
  );
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
