"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleAuthProvider({
  children,
  clientId,
}: {
  children: React.ReactNode;
  clientId: string;
}) {
  return clientId ? (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  ) : (
    children
  );
}
