
type Submenu = {
    href: string;
    label: string;
    active?: boolean;
    permission?: string[];
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: string;
    submenus?: Submenu[];
    permission?: string[];
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
                    icon: 'FaChartPie',
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
                    icon: 'FaBlog',
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
                    label: 'Service',
                    icon: 'FaLaptopFile',
                    permission: [
                        'services.manage',
                        'services.view'
                    ],
                    submenus: [
                        {
                            href: '/admin/service',
                            label: 'All Services',
                        },
                        {
                            href: '/admin/service/category',
                            label: 'Service Category',
                        },
                    ],
                },
                {
                    href: '/admin/tools',
                    label: 'Tools',
                    icon: 'FaToolbox',
                    permission: [
                        'tools.manage',
                        'tools.view'
                    ],
                },
            ],
        },
        {
            groupLabel: 'Users and Roles',
            menus: [
                {
                    href: '/admin/users',
                    label: 'Users',
                    icon: 'FaUsers',
                    permission: [
                        'user.manage',
                        'user.view'
                    ],
                },
                {
                    href: '/admin/roles',
                    label: 'Roles',
                    icon: 'FaUserShield',
                    permission: [
                        'roles.manage',
                        'roles.view'
                    ],
                },
                {
                    href: '/admin/permissions',
                    label: 'Permissions',
                    icon: 'FaShieldCat',
                    permission: [
                        'permission.manage',
                        'permission.view'
                    ],
                },
            ],
        },
        {
            groupLabel: 'Settings',
            menus: [
                {
                    href: '/admin/testimonials',
                    label: 'Testimonials',
                    icon: 'FaQuoteLeft',
                    permission: [
                        'testimonials.manage',
                        'testimonials.view'
                    ],
                },
                {
                    href: '/admin/web',
                    label: 'Web Settings',
                    icon: 'FaGear',
                    permission: [
                        'settings.manage',
                        'settings.view'
                    ],
                },
                {
                    href: '/account',
                    label: 'Account',
                    icon: 'FaUser',
                },
            ],
        },
    ];
}
