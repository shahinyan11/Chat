import React, {Component} from 'react';
import '../../asset/sass/gridGallery.scss'
import {imageDialogOpen} from "../../store/actions/index";
import Gallery from "react-photo-gallery";
import {connect} from "react-redux";

class GridGallery extends Component {

    openLightbox = (event, {photo, index}) => {
        // const {imageDialogOpen} = this.props;
        // imageDialogOpen(true, photo.id)
    };

    render() {
        const {chatPhotos} = this.props;
        const photos = chatPhotos.map((value)=>{
            let photo = {...value.user_image}
            photo.src = `${process.env.REACT_APP_BACKEND_URL}/uploads/${photo.src.replace('.', '_200.')}`;
            return photo
        });
        let controlWidth = 0;
        return (
            <>
                <Gallery  photos={photos} onClick={this.openLightbox}/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    chatPhotos: state.index.chatPhotos,

});

const mapDispatchToProps = {
    imageDialogOpen
};

const GridGalleryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GridGallery);

export default GridGalleryContainer;
