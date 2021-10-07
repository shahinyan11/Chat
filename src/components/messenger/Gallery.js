import * as React from 'react';
import Masonry from 'react-masonry-component';
import {imageDialogOpen, MessangerImageDialogOpen} from "../../store/actions/index";
import {connect} from "react-redux";

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {

    handleClick = (imgId) => {
        const {imageDialogOpen} = this.props;
        imageDialogOpen(true, imgId, 'messenger')
    };
    render() {
        const {data} = this.props;
        const imagesExist = data.message_attachment.length > 0;
        const photo = data.message_attachment.map((attachment) => {
            if (attachment.type === 'image') {
            return (
                <li

                key={attachment.user_image.id}
                className="image-element-class"
                onClick={()=>{this.handleClick(attachment.user_image.id)}}
            >
              <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${attachment.user_image.src.replace('.', '_400.')}`} alt=""/>
            </li>
            )}
        });

        const finalImages = imagesExist && photo ? photo : null;
        return (
            <>
                {  finalImages ? 
                      <Masonry
                        className={'my-gallery-class'} // default ''
                            elementType={'ul'} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            imagesLoadedOptions={imagesLoadedOptions} // default {}
                        >
                            {finalImages}
                        </Masonry>
                        : ''
                }
            </>
        );
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    imageDialogOpen
};

const GalleryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Gallery);


export default GalleryContainer;