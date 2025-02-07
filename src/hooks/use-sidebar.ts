import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Storage } from '@/lib';

type SidebarSettings = { disabled: boolean; isHoverOpen: boolean };
type SidebarStore = {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  getOpenState: () => boolean;
  setSettings: (settings: Partial<SidebarSettings>) => void;
  checkAuth: () => void;
};

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true,
      isHover: false,
      settings: { disabled: false, isHoverOpen: true },
      toggleOpen: () => {
        set({ isOpen: !get().isOpen });
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },
      setIsHover: (isHover: boolean) => {
        set({ isHover });
      },
      getOpenState: () => {
        const state = get();
        return state.isOpen || (state.settings.isHoverOpen && state.isHover);
      },
      setSettings: (settings: Partial<SidebarSettings>) => {
        set(
          produce((state: SidebarStore) => {
            state.settings = { ...state.settings, ...settings };
          }),
        );
      },
      checkAuth: () => {
        const token = Storage.get('local', 'token');
        const role = Storage.get('local', 'role');

        set(
          produce((state: SidebarStore) => {
            if (!token || !role) {
              state.settings.disabled = true;
            } else if (role !== 'user') {
              state.settings.disabled = false;
            } else {
              state.settings.disabled = true;
            }
          })
        );
      },
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Hook untuk menjalankan checkAuth saat komponen mount
export const useAuthCheck = () => {
  const checkAuth = useSidebar((state) => state.checkAuth);
  const navigate = useRouter();
  useEffect(() => {
    checkAuth();
    const token = Storage.get('local', 'token');
    const role = Storage.get('local', 'role');
    if (!token || !role) {
      navigate.push('/admin/auth');
    } else if (role === 'user') {
      navigate.push('/auth');
    }
  }, [checkAuth, navigate]);
};