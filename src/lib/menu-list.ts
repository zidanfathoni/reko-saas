
type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: string;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: 'FaToolbox',
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'Posts',
          icon: 'FaToolbox',
          submenus: [
            {
              href: '/posts',
              label: 'All Posts',
            },
            {
              href: '/posts/new',
              label: 'New Post',
            },
          ],
        },
        {
          href: '',
          label: 'Tools',
          icon: 'FaToolbox',
          submenus: [
            {
              href: '/admin/tools',
              label: 'All Tools',
            },
            {
              href: '/admin/tools/new',
              label: 'New Tools',
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/admin/users',
          label: 'Users',
          icon: 'FaToolbox',
        },
        {
          href: '/account',
          label: 'Account',
          icon: 'FaToolbox',
        },
      ],
    },
  ];
}
