import React, {Component} from 'react';
import {connect} from "react-redux";

class RoleUsers extends Component {

    render() {
        const{ roleUsers } = this.props;
        return (
            <div className={'RoleUsers'}>
                <table>
                    <thead>
                    <tr>
                        <td className="font-weight-bold">Screen name</td>
                        <td className="font-weight-bold">Email</td>
                        <td className="font-weight-bold">Role</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        roleUsers.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.screen_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    roleUsers: state.auth.roleUsers
});

const mapDispatchToProps = {

};

const RoleUsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoleUsers);

export default RoleUsersContainer