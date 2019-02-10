import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class Trending extends Component {
    componentDidMount() {
        this.props.store.getTrendingVideos();
    }

    render() {
        return (
            <div className="row">
                {this.props.store.trendingVideos.map(video => {
                    return (
                        <div className="col-md-12 col-sm-12 col-lg-6">{video.id}</div>
                    )
                })}
            </div>
        );
    }
}

export default inject("store")(observer(Trending));
