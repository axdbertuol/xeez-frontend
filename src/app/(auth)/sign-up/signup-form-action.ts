import { signupCred } from "@/lib/accounts/signup";
import { signinGoogle } from "@/lib/accounts/signup-google";
import {
  SignupFormSchema,
  FormState,
  GoogleSignFormState,
} from "@/lib/zod/signup-schema";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  const response = await signupCred(validatedFields.data);
  if (!response.success) {
    return {
      serverErrors: response.serverError,
      success: false,
    };
  }
  return { success: true };
}
export async function signupGoogle(
  state: GoogleSignFormState,
  formData: FormData,
) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    idToken: formData.get("idToken"),
    provider: formData.get("provider"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  const response = await signinGoogle(validatedFields.data);
  if (!response.success) {
    return {
      serverErrors: response.serverError,
      success: false,
    };
  }
  return { success: true };
}
