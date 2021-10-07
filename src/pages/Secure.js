import React, {Component} from 'react';
import '../asset/sass/secure.scss'
import RightBar from "../components/secure/RightBar";
import Wrapper from "../components/Wrapper";
import {getUserList, getRoleUsers} from "../store/actions/auth";
import {connect} from "react-redux";
import UsersList from "../components/secure/UsersList";
import RoleUsers from "../components/secure/RoleUsers";

class Secure extends Component {

    UNSAFE_componentWillMount() {
        this.props.getUserList();
        this.props.getRoleUsers();
    }

    render() {
        return (
            <div id={'Secure'}>
                <Wrapper>
                    <div className={'my_left_bar'}>
                        <UsersList/>
                    </div>
                    <div className={'my_container'}>
                        <RoleUsers/>
                    </div>
                    <div className={'my_right_bar'}>
                        <RightBar/>
                    </div>
                </Wrapper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getUserList,
    getRoleUsers
};

const SecureContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Secure);

export default SecureContainer