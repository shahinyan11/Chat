export default class MediaHandler {
    async getPermissions() {
        return new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then((stream) => {
                    res(stream);
                })
                .catch(err => {
                    rej(err)
                })
        });
    }
}

