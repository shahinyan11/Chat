import React, {Component} from 'react';
import {Modal} from 'react-bootstrap'
import {connect} from "react-redux";
import {imageDialogOpen, MessangerImageDialogOpen} from "../../../store/actions/index";
import {getAvatar} from "../../../helpers/helper";

class MessangerImageDialog extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.state = {
            dotsSelected: false,
            index: 0,
            rotate: 0,
            commentsShow: false,
            reported: null,
        };
    } 

    close = () => {
        this.props.messangerImageDialogOpen(false)
    };

    render() {
        return (
            <>
            {
             
                    <Modal.Dialog className={'imageDialog'}>
                        <img className={'close'} onClick={this.close} src="/images/icons/close.svg" alt=""/>
                        <Modal.Body >
                            <div className={`content commentShow`}>
                                <div className={'imagecontent'}>
                                    <img
                                        style={{transform: `rotate(-0deg)`}}
                                        className={`mainImg ${0 ? 'rotated' : ''}`}
                                        src=""
                                        alt=""
                                    />
                                    {
                                        
                                            <div className={`tools opacity`}>
                                                <div>
                                                    <div
                                                        className={'avatar'}
                                                        onClick={(e) => {console.log(`clicked avatar`)}}
                                                    >
                                                        {/* {getAvatar()} */}
                                                    </div>
                                                    <div className={'author title'}>
                                                        <b></b>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
            }
        </>

        );
    }
}

const MessangerImageDialogContainer = connect(
    MessangerImageDialogOpen
)(MessangerImageDialog);

export default MessangerImageDialogContainer;
