const data = {
    menu: {
        home: {
            id: '1',
            href: '/home',
            name: "home",
            icon: `/images/icons/account-plus.svg`,
            subMenu: [],
            disabled: true

        },
        photos: {
            id: '2',
            href: '/photos',
            name: 'photos',
            icon: `/images/icons/photo.svg`,
            subMenu: [],
            disabled: true

        },

        videos: {
            id: '3',
            href: '/videos',
            name: 'videos',
            icon: `/images/icons/video.svg`,
            subMenu: [],
            disabled: true

        },
        archives: {
            id: '4',
            href: '/archives',
            name: 'archives',
            icon: `/images/icons/account_multiple.svg`,
            subMenu: [],
            disabled: true

        },
        tropy: {
            id: '5',
            href: '/tropy',
            name: 'tropy',
            icon: `/images/icons/trophy.svg`,
            subMenu: [],
            disabled: true
        },
        forum: {
            id: '6',
            href: '/forum',
            name: 'forum',
            icon: `/images/icons/account-heart.svg`,
            subMenu: [],
            disabled: true
        },
        chat: {
            id: '7',
            href: '/chat',
            name: 'Live Chat',
            icon: `/images/icons/forum.svg`,
            subMenu:
                {
                    public: {
                        id: '1',
                        name: 'PUBLIC ROOMS',
                        rooms: []
                    },
                    // country: {
                    //     id: '2',
                    //     name: 'COUNTRY ROOMS',
                    //     rooms: []
                    // }
                    // ,
                    user: {
                        id: '3',
                        name: 'USER ROOMS',
                        rooms: []
                    },

                    'user-protected': {
                            id: '3',
                            name: 'USER ROOMS',
                            rooms: []
                    },
                    private: {
                        id: '4',
                        name: 'PRIVATE MESSAGES',
                        rooms: []
                    }
                }
        },
        messenger: {
            id: '8',
            href: '/messenger',
            name: 'messenger',
            icon: `/images/icons/message.svg`,
            subMenu: []
        }
        ,
    }
}

export default data
