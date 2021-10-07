export const ASSIGN_USER_ROLE = 'ASSIGN_USER_ROLE';
export const ASSIGN_USER_SUCCESS = 'ASSIGN_USER_SUCCESS';
export const ASSIGN_USER_FAIL = 'ASSIGN_USER_FAIL';



export function assignUserRole(id, role) {
    return {
        type: ASSIGN_USER_ROLE, payload: {id, role}
    }
}
