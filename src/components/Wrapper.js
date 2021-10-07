import React, {Component} from 'react';
import {connect} from "react-redux";
import Calling from "./messenger/Calling";
import {CSSTransition} from 'react-transition-group';
import ImageDialog from "./chat/post/ImageDialog";
import MessangerImageDialog from "./messenger/gallery/ImageDialog";
import NewMessageNotification from "./NewMessageNotification";
import Header from "./Header";

class Wrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newMessage: null
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {messageNotification} = this.props;
        if (messageNotification && messageNotification !== prevProps.messageNotification) {
            this.setState({
                newMessage: messageNotification
            })
            setTimeout(() => {
                this.setState({
                    newMessage: null
                })
            }, 3000)
        }
    }

    render() {
        const {inCalling, callingInYou, imageDialogOpen,messangerImageDialogOpen} = this.props;
        const {newMessage} = this.state;
        const open = newMessage ? true : false;
        return (
            <>
                <Header/>
                <div className='main-content'>
                    {this.props.children}
                    <CSSTransition
                        in={open}
                        timeout={2000}
                        classNames="alert"
                        unmountOnExit
                    >
                        <NewMessageNotification data={newMessage}/>
                    </CSSTransition>

                </div>
                {
                    imageDialogOpen ?
                        <ImageDialog/>
                        : null
                }
                {
                    messangerImageDialogOpen ?
                        <MessangerImageDialog/>
                        : null
                }
                {
                //    inCalling || callingInYou ? <Calling/> : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    inCalling: state.messenger.inCalling,
    callingInYou: state.messenger.callingInYou,
    errorNotification: state.error.errorNotification,
    imageDialogOpen: state.index.imageDialogOpen,
    messageNotification: state.messenger.messageNotification,
    messangerImageDialogOpen : state.index.messangerImageDialogOpen
});

const mapDispatchToProps = {};

const WrapperContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wrapper);

export default WrapperContainer;
