import React, {Component} from 'react';
// import FindUser from "./FindUser";
import {getPostedPhotos} from "../../store/actions/chat";
import {connect} from "react-redux";
import ProfileSettings from './ProfileSettings'

class RightBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: '1',
            menu: [
                {id: '1', icon: `/images/icons/settings.svg`},
                {id: '2', icon: `/images/icons/home/account_off.svg`}
            ]
        };
    }

    UNSAFE_componentWillMount() {
        const {activeRoomId, getPostedPhotos} = this.props;
        getPostedPhotos(activeRoomId)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {activeRoomId} = this.props;
        if (activeRoomId !== nextProps.activeRoomId) {
            this.props.getPostedPhotos(nextProps.activeRoomId)
        }
        return true
    }

    handleClick = (id) => {
        this.setState({
            active: id
        })
    };

    render() {
        const {menu, active} = this.state;
        // const imagesCount = this.props.postedPhotos.length;
        return (
            <>
                <div className="top">
                    {
                        menu.map((value) => (
                            <div key={value.id} className={value.id === active ? 'active' : ''} onClick={() => {
                                this.handleClick(value.id)
                            }}>
                                <img src={value.icon} alt=""/>
                            </div>
                        ))
                    }

                </div>
                <div className="center">
                    {
                        active === '1' ?
                            <>
                                <ProfileSettings/>
                            </> : null
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    postedPhotos: state.chat.postedPhotos
});

const mapDispatchToProps = {

    getPostedPhotos
};

const RightBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightBar);

export default RightBarContainer;
