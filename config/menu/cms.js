export const SIDEBAR = [{
        role: 'Super Admin',
        menu: [{
                icon: 'fa-home',
                name: 'Dashboard',
                link: '/manage/dashboard',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-file-alt',
                name: 'Data Pengajuan',
                link: '/manage/data-pengajuan',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-file',
                name: 'Kontent',
                link: '',
                dataTarget: 'kontent',
                subMenu: [{
                        name: 'Kelola FAQ',
                        link: '/manage/kelola-faq'
                    },
                    {
                        name: 'Kelola S&K',
                        link: '/manage/kelola-sk'
                    },
                    {
                        name: 'Kelola Layanan',
                        link: '/manage/kelola-layanan'
                    }
                ]
            },
            {
                icon: 'fa-images',
                name: 'Kelola Kegiatan',
                link: '/manage/kelola-kegiatan',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-chart-bar',
                name: 'Kelola Laporan',
                link: '/manage/kelola-laporan',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-file',
                name: 'Audit Trail',
                link: '/manage/audit-trail',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-users',
                name: 'Kelola Pengguna',
                link: '/manage/kelola-pengguna',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-star',
                name: 'Data Rating',
                link: '/manage/rating',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-lock',
                name: 'Page Authorization',
                link: '/manage/page-authorization',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-users',
                name: 'Kelola Peran',
                link: '/manage/kelola-peran',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-book',
                name: 'Report Analytics',
                link: '/manage/report-analytics',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-user',
                name: 'Profile',
                link: '/manage/profile',
                dataTarget: '',
                subMenu: []
            },
            // {
            //     icon: 'fa-lock',
            //     name: 'Ubah Password',
            //     link: '/manage/ubah-password',
            //     dataTarget: '',
            //     subMenu: []
            // }
        ]
    },
    {
        role: 'Supervisor',
        menu: [{
                icon: 'fa-tachometer-alt',
                name: 'Dashboard',
                link: '/manage/dashboard',
                dataTarget: '',
                subMenu: []
            },
            {
                icon: 'fa-clipboard',
                name: 'Data Pengajuan',
                link: '',
                dataTarget: 'pengajuan',
                subMenu: [{
                        name: 'Daftar Pengajuan',
                        link: '/manage/data-pengajuan'
                    },
                    {
                        name: 'Jadwal Agenda',
                        link: '/manage/jadwal-agenda'
                    },
                    {
                        name: 'Arsip Lampiran',
                        link: '/manage/arsip-lampiran'
                    }
                ]
            },
            // {
            //     icon: 'fa-chart-bar',
            //     name: 'Dokumen Laporan',
            //     link: '/manage/dokumen-laporan',
            //     dataTarget: '',
            //     subMenu: []
            // },
            {
                icon: 'fa-users',
                name: 'Pengguna',
                link: '',
                dataTarget: 'pengguna',
                subMenu: [{
                        name: 'Menunggu persetujuan',
                        link: '/manage/approval/menunggu-persetujuan'
                    },
                    {
                        name: 'Kelola pengguna',
                        link: '/manage/approval/kelola-pengguna'
                    }
                ]
            },
            {
                icon: 'fa-user',
                name: 'Profile',
                link: '/manage/profile',
                dataTarget: '',
                subMenu: []
            },
            // {
            //     icon: 'fa-lock',
            //     name: 'Ubah Password',
            //     link: '',
            //     dataTarget: '',
            //     subMenu: []
            // }
        ]
    }
];

export const ROUTE_ADMIN = [{
        url: '/manage/dashboard'
    },
    {
        url: '/manage/data-pengajuan'
    },
    {
        url: '/manage/kelola-faq'
    },
    {
        url: '/manage/kelola-sk'
    },
    {
        url: '/manage/kelola-layanan'
    },
    {
        url: '/manage/kelola-kegiatan'
    },
    {
        url: '/manage/kelola-laporan'
    },
    {
        url: '/manage/audit-trail'
    },
    {
        url: '/manage/kelola-pengguna'
    },
    {
        url: '/manage/rating'
    },
    {
        url: '/manage/kelola-peran'
    },
    {
        url: '/manage/page-authorization'
    },
    {
        url: '/manage/report-analytics'
    },
    {
        url: '/manage/profile'
    }
];

export const ROUTE_SUPERVISOR = [{
        url: '/manage/dashboard'
    },
    {
        url: '/manage/data-pengajuan'
    },
    {
        url: '/manage/jadwal-agenda'
    },
    {
        url: '/manage/arsip-lampiran'
    },
    {
        url: '/manage/approval/menunggu-persetujuan'
    },
    {
        url: '/manage/approval/kelola-pengguna'
    },
    {
        url: '/manage/profile'
    }
];










export const MENU = [{
        icon: 'fa-home',
        name: 'Dashboard',
        link: '/manage/dashboard',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-clipboard',
        name: 'Data Pengajuan',
        link: '',
        dataTarget: 'pengajuan',
        subMenu: [{
                name: 'Daftar Pengajuan',
                link: '/manage/data-pengajuan',
                permissionName: '',
            },
            {
                name: 'Jadwal Agenda',
                link: '/manage/jadwal-agenda',
                permissionName: '',
            },
            {
                name: 'Arsip Lampiran',
                link: '/manage/arsip-lampiran',
                permissionName: '',
            }
        ]
    },
    {
        icon: 'fa-file',
        name: 'Kontent',
        link: '',
        dataTarget: 'kontent',
        subMenu: [{
                name: 'Kelola FAQ',
                link: '/manage/kelola-faq',
                permissionName: '',
            },
            {
                name: 'Kelola S&K',
                link: '/manage/kelola-sk',
                permissionName: '',
            },
            {
                name: 'Kelola Layanan',
                link: '/manage/kelola-layanan',
                permissionName: '',
            }
        ]
    },
    {
        icon: 'fa-images',
        name: 'Kelola Kegiatan',
        link: '/manage/kelola-kegiatan',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-chart-bar',
        name: 'Kelola Laporan',
        link: '/manage/kelola-laporan',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-file',
        name: 'Audit Trail',
        link: '/manage/audit-trail',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-users',
        name: 'Pengguna',
        link: '',
        dataTarget: 'pengguna',
        subMenu: [{
                name: 'Menunggu persetujuan',
                link: '/manage/approval/menunggu-persetujuan',
                permissionName: '',
            },
            {
                name: 'Kelola pengguna',
                link: '/manage/approval/kelola-pengguna',
                permissionName: '',
            }
        ]
    },
    {
        icon: 'fa-star',
        name: 'Data Rating',
        link: '/manage/rating',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-lock',
        name: 'Page Authorization',
        link: '/manage/page-authorization',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-users',
        name: 'Kelola Peran',
        link: '/manage/kelola-peran',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-book',
        name: 'Report Analytics',
        link: '/manage/report-analytics',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    },
    {
        icon: 'fa-user',
        name: 'Profile',
        link: '/manage/profile',
        permissionName: '',
        dataTarget: '',
        subMenu: []
    }
];
