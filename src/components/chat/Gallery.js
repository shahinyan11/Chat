import * as React from 'react';
import Masonry from 'react-masonry-component';
import {imageDialogOpen} from "../../store/actions/index";
import {connect} from "react-redux";

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {

    handleClick = (photoId) => {
        const {imageDialogOpen} = this.props;
        imageDialogOpen(true, photoId, 'chat')
    }

    render() {

        let {chatPhotos, activeRoomId} = this.props;
        const photos = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId].photos : null;
        let arrayPhotos = Object.values(photos || {}).reverse();

        arrayPhotos = arrayPhotos.map((value)=>{
            let photo = {...value.user_image};
            photo.src = `${process.env.REACT_APP_BACKEND_URL}/uploads/${photo.src.replace('.', '_400.')}`;
            return photo
        });

        const childElements = arrayPhotos.map((photo)=>{
            return (
                <li
                    key={photo.id}
                    className="image-element-class"
                    onClick={()=>{this.handleClick(photo.id)}}
                >
                    <img src={photo.src} alt=""/>
                </li>
            );
        });

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {childElements}
            </Masonry>
        );
    }
}


const mapStateToProps = (state) => ({
    chatPhotos: state.index.chatPhotos,
    galleryUpdate: state.chat.galleryUpdate,
    activeRoomId: state.chat.activeRoomId,
});

const mapDispatchToProps = {
    imageDialogOpen
};

const GalleryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Gallery);

export default GalleryContainer;

