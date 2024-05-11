"use client";

import config from "@/config/config.json";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import GoogleAuthProvider from "./GoogleAuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  const { default_theme } = config.settings;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={default_theme}
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
};

export default Providers;
