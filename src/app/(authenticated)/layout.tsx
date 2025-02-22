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

/*
'use client'
import { Layout } from "src/components/Layout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "src/context/authContext";
import { hasPermission } from "src/utils/rbac";
import { Permission } from "src/utils/rbac";
import { ProtectedRoute } from 'src/components/ProtectedRoute';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== '/') {
      router.push('/');
      return;
    }

    // Define route permissions
    const routePermissions: Record<string, Permission> = {
      '/users': 'manage_users',
      '/statistics': 'view_statistics',
      '/participants': 'manage_participants',
      '/certificates': 'manage_certificates',
      '/scan': 'scan_qr',
      '/qrCodes': 'manage_qr_codes'
    };

    const requiredPermission = routePermissions[pathname];
    if (requiredPermission && !hasPermission(user?.role || 'staff', requiredPermission)) {
      router.push('/dashboard');
    }
  }, [user, router, pathname]);

  return <Layout>{children}</Layout>;
} 
  */