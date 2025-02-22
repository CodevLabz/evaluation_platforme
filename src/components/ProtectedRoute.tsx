import { ReactNode } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { Permission } from 'src/utils/rbac';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission: Permission;
  fallbackPath?: string;
}

export const ProtectedRoute = ({
  children,
  requiredPermission,
  fallbackPath = '/dashboard'
}: ProtectedRouteProps) => {
  const { checkPermission } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!checkPermission(requiredPermission)) {
      router.push(fallbackPath);
    }
  }, [requiredPermission, router, checkPermission, fallbackPath]);

  if (!checkPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}; 
