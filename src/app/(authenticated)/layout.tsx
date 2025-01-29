'use client'
import { Layout } from "src/components/Layout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "src/context/authContext";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

//   useEffect(() => {
//     if (!user && pathname !== '/') {
//       router.push('/');
//     }
//   }, [user, router, pathname]);

  return <Layout>{children}</Layout>;
} 