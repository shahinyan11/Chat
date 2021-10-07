export const CHANGE_ACTIVE_MENU = 'CHANGE_ACTIVE_MENU';
export const CHANGE_ACTIVE_SUB_CHILD = 'CHANGE_ACTIVE_SUB_CHILD';
export const SELECT_USER = 'SELECT_USER';

export function changeActiveMenu(id) {
  return {
    type: CHANGE_ACTIVE_MENU, payload: {id}
  }
}

export function changeActiveSubChild(roomId, roomJoined) {
  return {
    type: CHANGE_ACTIVE_SUB_CHILD, payload: {roomId, roomJoined}
  }
}

export function selectUser(id) {

  return {
    type: SELECT_USER, payload: {id}
  }
}
