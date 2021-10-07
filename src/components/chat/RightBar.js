import React, {Component} from 'react';
import Gallery from "./Gallery"
import OnlineUsers from "./OnlineUsers";
import {getPostedPhotos, setRequestAccess} from "../../store/actions/chat";
import {connect} from "react-redux";
import {ClipLoader} from "react-spinners";

class RightBar extends Component {

    constructor(props) {
        super(props);

        this.iScroll = null;

        this.state = {
            active: '1',
            loading: true,
            menu: [
                {id: '1', icon: "/images/icons/chat/apps.svg"},
                {id: '2', icon: "/images/icons/chat/account_details.svg"},
            ]
        };
    }

    componentDidMount() {
        const {activeRoomId, chatPhotos} = this.props;
        this.iScroll.addEventListener("scroll", () => {
            const {requestAccess, setRequestAccess } = this.props;
            if (
                this.iScroll.scrollTop + this.iScroll.clientHeight >= this.iScroll.scrollHeight
                && requestAccess
            ) {
                setRequestAccess(false);
                this.loadMoreItems();
            }
        });
        if(chatPhotos[activeRoomId] ){
            this.setState({
                loading: false
            });
        }
    }

    UNSAFE_componentWillMount() {
        const {activeRoomId, getPostedPhotos, chatPhotos} = this.props;
        if(!chatPhotos[activeRoomId]){
            getPostedPhotos(activeRoomId)
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {activeRoomId, chatPhotos, getPostedPhotos} = nextProps;
        if (this.props.activeRoomId !== activeRoomId) {
            if(!chatPhotos[activeRoomId]){
                getPostedPhotos(activeRoomId)
            }
        }
        if(this.props.chatPhotos !== chatPhotos ){
            this.setState({
                loading: false
            });
        }
        return true
    }

    loadMoreItems = () => {
        let {
            activeRoomId,
            getPostedPhotos,
            chatPhotos
            // requestAccess
        } = this.props;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const {photosCount} =  chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photosCount: null};
        const arrayPhotos = Object.values(photos);
        if(photosCount > arrayPhotos.length){
            this.setState({
                loading: true
            });
            setTimeout(()=>{
                getPostedPhotos(activeRoomId, arrayPhotos.length)
            }, 1000)

        }
    }

    handleClick = (id) => {
        this.setState({
            active: id
        })
    }

    render() {
        const {menu, active} = this.state;
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
                                <div ref={ (el) => {this.iScroll = el} } className={'photos'}>
                                    {/*<GridGallery/>*/}
                                    <Gallery/>
                                    <div className='sweet-loading'>
                                        <ClipLoader
                                            sizeUnit={"px"}
                                            size={150}
                                            color={'#123abc'}
                                            loading={this.state.loading}
                                        />
                                    </div>
                                </div>

                            </>
                            : active === '2' ?
                                <OnlineUsers/>
                            : null
                    }
                </div>
                <div className="bottom">
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    // postedPhotos: state.chat.postedPhotos,
    chatPhotos: state.index.chatPhotos,
    photosCount: state.index.photosCount,
    requestAccess: state.chat.requestAccess

});

const mapDispatchToProps = {
    getPostedPhotos,
    setRequestAccess
};

const RightBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightBar);

export default RightBarContainer;
