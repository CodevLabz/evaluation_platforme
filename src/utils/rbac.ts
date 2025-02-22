export type Permission = 
  | 'manage_users'
  | 'view_statistics'
  | 'manage_participants'
  | 'manage_certificates'
  | 'scan_qr'
  | 'view_dashboard'
  | 'manage_qr_codes';

export type Role = 'admin' | 'organizer' | 'staff';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'manage_users',
    'view_statistics',
    'manage_participants',
    'manage_certificates',
    'scan_qr',
    'view_dashboard',
    'manage_qr_codes'
  ],
  organizer: [
    'manage_participants',
    'manage_certificates',
    'scan_qr',
    'view_dashboard',
    'manage_qr_codes'
  ],
  staff: [
    'scan_qr',
    'view_dashboard'
  ]
};

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}; 