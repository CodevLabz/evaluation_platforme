"use client";
import Image from "next/image";
import { LoginPage } from "./login";
import { AuthProvider } from "src/context/authContext";

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
