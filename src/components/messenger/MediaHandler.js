export default class MediaHandler {
    getPermissions(audio = true) {
        return new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: audio})
                .then((stream) => {
                    res(stream);
                })
                .catch(err => {
                    // throw new Error(`Unable to fetch stream ${err}`);
                })
        });
    }
}