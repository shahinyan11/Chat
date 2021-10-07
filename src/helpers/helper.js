import React from 'react';
import TimeAgo from "react-timeago";

const moment = require('moment');

export function urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return `<a href=${url}>${url}</a>`;
    })
}

export function getSubmenu(menu, activeMenuId) {
    menu = menu.filter((value) => {
        return value.id === activeMenuId ? true : false
    })[0];

    return menu.subMenu
}

export function setSubmenuRooms(rooms, subMenu) {
    for (let key in subMenu) {
        subMenu[key].rooms = []
    }
    if (rooms) {
        rooms.forEach((value) => {
            if (value.privacy in subMenu) {
                subMenu[value.privacy].rooms.push(value)
            }
        })
    }

    return subMenu
}

export function getActiveRoom (rooms, activeRoomId) {
    if (rooms.length > 0) {
        const room = rooms.filter((value) => {
            return Number(value.id) === Number(activeRoomId) ? true : false
        })[0]

        return room
    } else {
        return null
    }
};


export function pastTime(postedDate) {
    const date = moment.utc(postedDate);
    const res = moment.duration(moment(new Date()).diff(date)).asMinutes() < 1 ? 'just now' : <TimeAgo date={date}/>
    return res
}


export function getAvatar(user) {
    const screenName = user['owner_screen_name'] || user['screen_name'];
    const avatar = user['owner_avatar'] || user['avatar'];
    const id = user['owner_id'] || user['id'];
    const firstLetters = screenName.substr(0, 2).toUpperCase();
    if ( avatar === 'default') {
        return (
            <div className={'letterAvatar pointer avatarImg'} style={{backgroundColor: stringToHslColor(firstLetters, 20, 35)}}>
                {firstLetters}
            </div>
        )
    } else if (avatar === 'small') {
        return (
            <div className={'letterAvatarSmall pointer avatarImg'} style={{backgroundColor: stringToHslColor(firstLetters, 20, 35)}}>
                {firstLetters}
            </div>
        )
    }
    return (
        <img className={'avatarImg pointer'} src={`https://hwcdn.voyeurweb.com/uploads/users/${id}/m_${avatar}`} alt=""/>
    )
}

export function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

export function generateRoomName(name) {
    // underscores instead of spaces
    return name.replace(/ /g, '_')
}

export function empty(data) {
    return (typeof data === 'undefined')
}

export function spinner(show) {
    return (
        <div className={`spinner-border ${!show ? 'd-none' : ''}`}>
            <span className={'sr-only'}>Loading...</span>
        </div>
    )
}

export function removeDuplicateObjects(arr, key) {
    let lookup = {};
    return arr.filter((obj) => {
        const bool = !lookup[ obj[key] ];
        if(bool){
            lookup[obj[key]] = true
        }
        return bool
    })
}
