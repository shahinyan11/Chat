import React, {Component} from 'react';
import {connect} from "react-redux";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import ProfileSettings from "./ProfileSettings";

class Settings extends Component {
    render() {
        const {profileEditSelected} = this.props

        return (
            <>
                {
                    profileEditSelected ?
                        <ProfileAvatarUpload/>
                        : <ProfileSettings/>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    profileEditSelected: state.home.profileEditSelected,
});

const mapDispatchToProps = {};

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);

export default SettingsContainer;
