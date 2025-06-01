// contexts/PermissionContext.tsx
"use client"
import PermissionHelper from '@/helper/permission-helper';
import { Permission } from '@/lib/interface/auth/getPermission';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface PermissionContextType {
  permissions: Permission[];
  isLoading: boolean;
  refreshPermissions: () => void;
  hasPermission: (required: string | string[]) => boolean;
  hasAllPermissions: (required: string[]) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPermissions = async () => {
    setIsLoading(true);
    try {
      const perms = PermissionHelper.getUserPermissions();
      setPermissions(perms);
    } catch (error) {
      console.error('Failed to load permissions:', error);
      setPermissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  const value = {
    permissions,
    isLoading,
    refreshPermissions: loadPermissions,
    hasPermission: (required: string | string[]) =>
      PermissionHelper.checkPermissions(permissions, required),
    hasAllPermissions: (required: string[]) =>
      PermissionHelper.checkPermissionsAll(permissions, required)
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};
