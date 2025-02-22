import { useAuth } from 'src/context/authContext';
import { Permission, hasPermission } from 'src/utils/rbac';

export const usePermissions = () => {
  const { user} = useAuth();
  
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  return { checkPermission };
}; 