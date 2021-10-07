import React, {Component} from 'react';
import {connect} from "react-redux";
import {assignUserRole} from "../../store/actions/admin";
import {getRoleUsers} from "../../store/actions/auth";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

class UsersList extends Component {

    constructor(props) {
        super(props);

        this.roles = [
            {id: 'admin', text: 'admin'},
            {id: 'moderator', text: 'moderator'}
        ]

        this.state = {
            userId: null,
            role: null,
        }
    }

    selectUser = (e) => {
        this.setState({
            userId: e.target.value
        })
    };

    selectRole = (e) => {
        this.setState({
            role: e.target.value
        })
    };

    assign = () => {
        const {userId, role} = this.state;
        if (userId && role) {
            this.props.assignUserRole(userId, role);
            this.setState({
                userId: null,
                role: null,
            });
        }
    };

    render() {
        let {usersList} = this.props;
        const {userId, role} = this.state;
        usersList = usersList.map((value) => {
            return {text: value.screen_name, id: value.id}
        })
        return (
            <div className={'UsersList'}>
                {
                    usersList[0] ?
                        <table>
                            <thead>
                            <tr>
                                <td>Nickname</td>
                                <td>Role</td>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <Select2
                                        value={userId}
                                        className={'selector'}
                                        data={usersList}
                                        onChange={this.selectUser}
                                    />
                                </td>
                                <td>
                                    <Select2
                                        value={role}
                                        className={'selector'}
                                        data={this.roles}
                                        onChange={this.selectRole}
                                    />
                                </td>
                                <td onClick={this.assign}>
                                    <button>assign</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        : null
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    usersList: state.auth.usersList
});

const mapDispatchToProps = {
    assignUserRole,
    getRoleUsers
};

const UsersListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersList);

export default UsersListContainer