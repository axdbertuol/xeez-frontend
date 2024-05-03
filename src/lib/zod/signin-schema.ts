import { z } from "zod";
import { schemaAuthBasic } from "./utils";

export const googleSigninSchema = z
  .object({
    idToken: z.string(),
  })
  .merge(schemaAuthBasic);

export const credSigninSchema = z
  .object({
    password: z.string(),
    email: z.string().email(),
    idToken: z.string(),
  })
  .merge(schemaAuthBasic);
export type TCredSigninSchema = z.infer<typeof credSigninSchema>;
export type TGoogleSigninSchema = z.infer<typeof googleSigninSchema>;
