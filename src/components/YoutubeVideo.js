import React from 'react'

const YoutubeVideo = ({video}) => {
    return (
        <div className="d-flex flex-row video-top-container">
            <div style={{backgroundImage: `url("${video.snippet.thumbnails.high.url}")`}}
                 className="align-self-start mr-3 video-image"/>
            <div className="d-flex flex-column text-truncate">
                <h5 className="mt-0 text-truncate">{video.snippet.title}</h5>
                <div className="video-description text-truncate"
                >{video.snippet.description}</div>
            </div>
        </div>
    )
};
export default YoutubeVideo;