import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const Comments = ({comment, history}) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className="d-flex flex-row mb-3">
            <div
                style={{backgroundImage: `url("${comment.snippet.topLevelComment.snippet.authorProfileImageUrl.replace("s28", "s100")}")`}}
                className="align-self-start mr-3 comment-author-image"/>
            <div className="d-flex flex-column border-bottom">
                <h6 className="comment-author-name">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </h6>
                <span className="font-weight-lighter comment-text">
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                </span>
            </div>
        </div>
    )
};
export default withRouter(Comments);