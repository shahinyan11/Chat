import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import data from "../services/data";
import {changeActiveMenu} from "../store/actions/menu";
import {connect} from "react-redux";


class Forum extends Component {

    componentWillMount() {
        this.props.changeActiveMenu(data.menu.forum.id)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signOut()
    }

    render() {
        return (
            <div id={'Forum'}>
                <Wrapper>
                    <div className={'my_left_bar'}>
                        <div className={'sub_menu'}>

                        </div>
                    </div>
                    <div className={'my_container'}>
                        <div className={'my_content'}>

                        </div>
                    </div>
                    <div className={'my_right_bar'}>
                    </div>
                </Wrapper>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    changeActiveMenu

};

const ForumContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Forum);

export default ForumContainer;