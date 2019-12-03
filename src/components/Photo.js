import React from 'react';
import ImageZoom from 'react-medium-image-zoom'

export default function Photo({ photo }) {

    const photoSrc = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
    const photoSrcLarge = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`

    return (
        <div>
            <ImageZoom
                    image={{
                    src: photoSrc,
                    alt: photo.title,
                    className: 'zoomPhoto',
                    }}
                    zoomImage={{
                    src: photoSrcLarge,
                    alt: photo.title
                    }}
                    shouldReplaceImage={false}
                />
        </div>
    )
}
