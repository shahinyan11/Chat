import React, {Component} from 'react';
import {call, sendMessage, addMessage} from "../../store/actions/messenger";
import {closeAllModals} from "../../store/actions/chat";
import {connect} from "react-redux";
import nextId from "react-id-generator";

class MakeMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            message: '',
            selectedImage: "",
            files: [],
            sending: false,
            uId: null,
            hint: 'Sending ...'
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        const data = Array.from(e.target.files);
        data.forEach((file) => {
            let reader = new FileReader();
            const {files} = this.state;
            reader.onloadend = () => {
                files.push({
                    file: file,
                    imagePreviewUrl: reader.result
                })
                this.setState({
                    files: [...files]
                })
            }
            reader.readAsDataURL(file)
        })
        this.setState({
            selectedImage: ""
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const{lastSendedMessage} = this.props;
        const {uId} = this.state;
        if(lastSendedMessage !== nextProps.lastSendedMessage && uId === nextProps.lastSendedMessage.uId){
            this.setState({
                hint: 'Sent'
            })
            setTimeout(()=>{
                this.props.closeAllModals();
            },1000)
        }
        return true
    }

    sendMessage = (e) => {
        e.preventDefault();
        const {authSelectedUserId, userId} = this.props;
        const selectedUserId = authSelectedUserId;
        const {files} = this.state;
        const message = e.target.message.value;
        e.target.message.value = '';

        if (message !== '' || files.length > 0) {
            const data = new FormData();
            files.forEach((value) => {
                data.append('file[]', value.file)
            })
            data.append('userId', userId || selectedUserId);
            data.append('message', message);

            // uId-n ogtagorcum enq nra hamar, vor sendMessage zaprosi patasxn@ stanaluc heto, karoxananq gtnenq te et patasxan@ konkret vor message-in e vereberum
            const uId = nextId();

            this.setState({
                files: [],
                sending: true,
                uId
            });

            this.props.sendMessage(data, uId);
        }
    };

    removeUploadItem = (file) => {
        const {files} = this.state
        const filterFiles = files.filter((value) => {
            return value !== file ? true : false
        })
        this.setState({
            files: [...filterFiles]
        })
    };


    render() {
        let {files, sending, hint} = this.state;
        const {inModal} = this.props;

        if(!inModal){
            sending = false
        }
        return (
            <div className={'MakeMessage'}>
                {
                    !sending ?
                        <>
                            <div className={'reviewImages'}>
                                {
                                    files.map((file, index) => (
                                        <div key={index}>
                                            <img className={'close'} onClick={() => {
                                                this.removeUploadItem(file)
                                            }} src={`/images/icons/close.svg`} alt=""/>
                                            <img src={file.imagePreviewUrl} alt="" height={50}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={'send_bord'}>
                                <form onSubmit={this.sendMessage}>
                                    <div className={'pointer'}>
                                        <label className={'pointer'} htmlFor="file">
                                            <i className="material-icons">
                                                photo_camera
                                            </i>
                                        </label>
                                        <input
                                            value={this.state.selectedImage}
                                            onChange={this.handleChange}
                                            type="file"
                                            name='file'
                                            id={'file'}
                                            className={'file_input'} multiple/>
                                    </div>

                                    <div className={'message'}>
                                        <input type="text" name={'message'}
                                               placeholder={'Type a message'} autoComplete="off"/>
                                    </div>

                                    <button type="submit" className={'send_icon pointer'}>
                                        <i className="material-icons">
                                            send
                                        </i>
                                    </button>
                                </form>
                            </div>
                        </>
                        : <div>{hint} </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authSelectedUserId: state.messenger.selectedUserId,
    lastSendedMessage: state.messenger.lastSendedMessage,

});

const mapDispatchToProps = {
    call,
    sendMessage,
    addMessage,
    closeAllModals
};

const MakeMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MakeMessage);

export default MakeMessageContainer;