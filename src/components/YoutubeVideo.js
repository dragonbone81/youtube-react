import React from 'react'

const YoutubeVideo = ({video}) => {
    return (
        <div className="d-flex flex-row">
            <img src={video.snippet.thumbnails.default.url} className="align-self-start mr-3" alt=""/>
            <div className="d-flex flex-column text-truncate">
                <h5 className="mt-0 text-truncate">{video.snippet.title}</h5>
                <div className="video-description text-truncate"
                >{video.snippet.description}</div>
            </div>
        </div>
    )
};
export default YoutubeVideo;