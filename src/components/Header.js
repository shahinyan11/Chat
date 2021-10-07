import React, {Component} from 'react';
import {getAvatar} from "../helpers/helper";
import {signOut} from "../store/actions/auth";
import Menu from "./Menu";
import {connect} from "react-redux";

class Header extends Component {

    logout =()=>{
        this.props.signOut()
    }

    render() {
        const {user} = this.props;
        return (
            <div className={'Header'}>
                <div className={'networkSites'}>
                    <div className={'left'}>
                        <ul>
                            <li >QUALITY AMATEUR CONTENT SINCE 1997</li>
                            <li >OUR NETWORK SITES</li>
                            <li className="font-weight-bold">RedClouds</li>
                            <li className="font-weight-bold">HomeClips</li>
                            <li className="font-weight-bold">FunBags</li>
                        </ul>
                    </div>
                    <div className={'right'}>
                        <ul>
                            <li className="font-weight-bold">BACK TO RED CLOUDS MAIN SITE</li>
                            <li className={'pointer'} onClick={this.logout}>LOGOUT</li>
                        </ul>

                    </div>
                </div>
                <div className={'nav_bar'}>
                    <div className={'logo'}>
                        <img src={'/images/logo.png'} alt={''}></img>
                        <b className={'logoText title'}>SOCIAL HUB</b>
                    </div>
                    <div className={'user'}>
                        {
                            user ?
                                <>
                                    <div
                                        className={'avatar'}
                                        // onClick={(e) => {
                                        //     this.avatarClick(e, foundPost.id)
                                        // }}
                                    >
                                        {getAvatar(user)}

                                    </div>
                                    <div className={'author title'}>
                                        <h4>
                                            <b>{user.screen_name}</b>
                                        </h4>
                                    </div>
                                </>
                                :null
                        }
                    </div>
                    <Menu/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    signOut
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);


export default HeaderContainer;
