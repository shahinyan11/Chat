import React, {Component} from 'react';
import {connect} from "react-redux";
import Wrapper from "../components/Wrapper";
import Users from "../components/messenger/Users";
import Message from "../components/messenger/Message";
import RightBar from "../components/messenger/RightBar";
import {getUserList} from "../store/actions/auth"
import {changeActiveMenu} from "../store/actions/menu"
import '../asset/sass/messenger.scss'
import '../asset/css/custome.css'
import data from "../services/data";
import ScrollLoad from "../components/messenger/ScrollLoad";

class Messenger extends Component {

    UNSAFE_componentWillMount() {
        this.props.getUserList();
        this.props.changeActiveMenu(data.menu.messenger.id)
    }

    render() {
        const {inCalling, callingInYou} = this.props;
        return (
            <div id={'messenger'}>
                <Wrapper>
                    <div className={'my_left_bar'}>
                        <div className={'list_users'}>
                            <Users/>
                        </div>
                    </div>
                    <div className={'my_content'}>
                        {/*<Message/>*/}
                        <ScrollLoad/>
                    </div>
                    <div className={'my_right_bar'}>
                        {
                           inCalling || callingInYou ? null : <RightBar/>
                        }
                    </div>
                </Wrapper>
                {/*{*/}
                {/*    inCalling || callingInYou ? <Calling/> : null*/}
                {/*}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    inCalling: state.messenger.inCalling,
    callingInYou: state.messenger.callingInYou,
});

const mapDispatchToProps = {
    getUserList,
    changeActiveMenu

};

const MessengerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Messenger);

export default MessengerContainer;
