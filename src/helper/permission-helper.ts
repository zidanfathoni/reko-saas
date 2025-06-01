import { Storage } from '@/lib';

interface Permission {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

class PermissionHelper {
  private static readonly PERMISSION_KEY = 'userPermission';

  /**
   * Initialize permissions in storage if not exists
   */
  private static initPermissions(): void {
    if (!Storage.get('local', this.PERMISSION_KEY)) {
      Storage.set('local', this.PERMISSION_KEY, JSON.stringify([]));
    }
  }

  /**
   * Update permissions in storage
   * @param permissions Array of permissions to save
   */
  static setUserPermissions(permissions: Permission[]): void {
    try {
      Storage.set('local', this.PERMISSION_KEY, JSON.stringify(permissions));
    } catch (error) {
      console.error('Failed to save permissions:', error);
    }
  }

  /**
   * Check if user has specific permission
   * @param requiredPermissions Single permission or array of permissions
   * @returns boolean
   */
  static hasPermission(requiredPermissions: string | string[]): boolean {
    try {
      this.initPermissions(); // Ensure permissions exist
      const storedPermissions = Storage.get('local', this.PERMISSION_KEY);
      const userPermissions = this.parsePermissions(storedPermissions);

      const permissionsToCheck = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

      return permissionsToCheck.some(permission =>
        userPermissions.some(userPerm => userPerm.name === permission)
      );
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  }

  /**
   * Safely parse permissions from storage
   */
  private static parsePermissions(storedPermissions: unknown): Permission[] {
    if (typeof storedPermissions !== 'string') {
      return [];
    }

    try {
      const parsed = JSON.parse(storedPermissions);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Get all user permissions
   */
  static getUserPermissions(): Permission[] {
    try {
      this.initPermissions(); // Ensure permissions exist
      const storedPermissions = Storage.get('local', this.PERMISSION_KEY);
      return this.parsePermissions(storedPermissions);
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return [];
    }
  }

  /**
   * Check if user has all required permissions (AND condition)
   */

  static checkPermissions(
    userPermissions: Permission[],
    requiredPermissions: string | string[]
  ): boolean {
    const permissionsToCheck = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];

    return permissionsToCheck.some(permission =>
      userPermissions.some(userPerm => userPerm.name === permission)
    );
  }

  static checkPermissionsAll(
    userPermissions: Permission[],
    requiredPermissions: string[]
  ): boolean {
    return requiredPermissions.every(permission =>
      userPermissions.some(userPerm => userPerm.name === permission)
    );
  }

  static hasAllPermissions(requiredPermissions: string[]): boolean {
    try {
      const userPermissions = this.getUserPermissions();
      return requiredPermissions.every(permission =>
        userPermissions.some(userPerm => userPerm.name === permission)
      );
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  }



  /**
   * Clear all permissions from storage
   */
  static clearPermissions(): void {
    Storage.remove('local', this.PERMISSION_KEY);
  }
}

export default PermissionHelper;
