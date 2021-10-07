import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {changeActiveMenu} from "../store/actions/menu";
import {videoCallOnOff, volumeOnOff} from "../store/actions/messenger";
import data from "../services/data";
// import {OverlayTrigger} from 'react-bootstrap';
// import CustomTooltip from './CustomTooltip';
import { Nav } from 'react-bootstrap'



class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            audioCall: true,
            videoCall: true,
        };
    }


    handleClick = (id) => {
        this.props.changeActiveMenu(id)
    };

    videoHandleClick = async () => {
        const {videoCall, videoCallOnOff} = this.props;
        try {
            // const cameraConnected = await navigator.mediaDevices.getUserMedia({video: true})
            videoCallOnOff(!videoCall)
        } catch (e) {}
    };

    volumeHandleClick = () => {
        const {volume, volumeOnOff} = this.props;
        volumeOnOff(!volume)
    };

    linkTo = (e) => {
        e.preventDefault()
    };

    showTooltip = async () => {
        try {
            // const cameraConnected = await navigator.mediaDevices.getUserMedia({video: true})
            // return (
            //     <CustomTooltip>
            //         good
            //     </CustomTooltip>
            // )
        } catch (e) {
            // return (
            //     <CustomTooltip>
            //         error
            //     </CustomTooltip>
            // )
        }
    }



    render() {
        const {menu} = data;
        const {activeMenuId, videoCall, volume, unreadCount} = this.props;

        // let submanu = [];
        // menu.filter((value) => {
        //     return value.id === activeMenuId ? submanu = value.submanu : false
        // })
        return (
                <div id={'menu'}>
                    <div>
                        <ul>
                            {
                                Object.values(menu).map((value) => (
                                    <li className={`nav_item ${value.id === activeMenuId ? 'active' : null} ${value.name}`}
                                        key={value.id}>
                                        <div className={value.name}
                                             onClick={!value.disabled && value.id !== activeMenuId ? () => {
                                                 this.handleClick(value.id)
                                             } : null}>

                                            {
                                                ! value.disabled ?
                                                    <Link to={`${value.href}`}>
                                                        <img src={value.icon} alt=""/>
                                                        <div className={'text-uppercase'}>{value.name}</div>
                                                    </Link>
                                                    :null

                                            }
                                            {
                                                value.name === 'messenger' && unreadCount > 0 ?
                                                    <span className={'unread_messages'}>{unreadCount}</span>
                                                    : null
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        {/*<div className={'bottom'}>*/}
                        {/*    <div>*/}
                        {/*        <Link to="#">*/}
                        {/*            /!*<img src={`/images/icons/message.svg`} alt=""/>*!/*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <Link to="#">*/}
                        {/*            <img src={`/images/icons/settings.svg`} alt=""/>*/}
                        {/*        </Link>*/}
                        {/*        <img onClick={this.volumeHandleClick}*/}
                        {/*             src={`/images/icons/${volume ? 'volume_on.svg' : 'volume_off.svg'}`}*/}
                        {/*             alt=""/>*/}
                        {/*        <img src={`/images/icons/microphone(1).svg`} alt=""/>*/}
                        {/*        /!*<OverlayTrigger*!/*/}
                        {/*        /!*    key={'right'}*!/*/}
                        {/*        /!*    placement={'right'}*!/*/}
                        {/*        /!*    overlay={ this.showTooltip }*!/*/}
                        {/*        /!*>*!/*/}
                        {/*            <img onClick={this.videoHandleClick}*/}
                        {/*                 src={`/images/icons/${videoCall ? 'video_on.svg' : 'video_off.svg'}`}*/}
                        {/*                 alt=""/>*/}
                        {/*        /!*</OverlayTrigger>*!/*/}


                        {/*    </div>*/}


                        {/*</div>*/}
                    </div>
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    activeMenuId: state.menu.activeMenuId,
    videoCall: state.messenger.videoCall,
    volume: state.messenger.volume,
    unreadCount: state.messenger.unreadCount,
});

const mapDispatchToProps = {
    changeActiveMenu,
    videoCallOnOff,
    volumeOnOff
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Menu);

export default MenuContainer;
