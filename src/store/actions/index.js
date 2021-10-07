import {IMAGE_DIALOG_OPEN} from "./chat";
import {MESSANGER_IMAGE_DIALOG_OPEN} from "./messenger";

export const CLOSE_WINDOW = "CLOSE_WINDOW";


export function imageDialogOpen(bool, imgId = null, page) {
    return {
        type: IMAGE_DIALOG_OPEN,
        payload: {bool, imgId, page}
    }
}
export function closeWindow() {
    return {
        type: CLOSE_WINDOW,
    }
}

export function MessangerImageDialogOpen(bool, imgId = null, page) {
    return {
        type: MESSANGER_IMAGE_DIALOG_OPEN,
        payload: {bool, imgId, page}
    }
}