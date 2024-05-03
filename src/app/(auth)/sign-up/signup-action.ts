import { SignupFormSchema, FormState } from "@/lib/zod/signup-schema";

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
    };
  }
}
