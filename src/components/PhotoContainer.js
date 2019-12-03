import React, { Component } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Photo from './Photo';

//Masonry options
const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    900: 4,
    500: 3
};

export default class PhotoContainer extends Component {

    render() {
        
        const PhotoItems = this.props.data.map((photo, i) => {
            return (
                <Photo key={i} photo={photo} />
             );
         });

         return (
            <div data-testid="imageContainer" id="imageContainer">
                <InfiniteScroll
                    dataLength={this.props.data.length}
                    next={this.props.fetchPhoto}
                    hasMore={true}
                >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="photo-grid"
                    columnClassName="photo-grid_column"
                >
                    {PhotoItems}
                </Masonry>
                </InfiniteScroll>
            </div>
        )
    }
}