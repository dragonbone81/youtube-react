import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import YoutubeVideo from '../components/YoutubeVideo';

class Trending extends Component {
    componentDidMount() {
        this.props.store.getTrendingVideos();
    }

    state = {
        bottom: false,
        bottomAlreadyReached: false,
        loadingMoreVideos: false,
    };

    onScroll = ({target}) => {
        if (
            (target.scrollHeight - target.scrollTop) <= (target.clientHeight + 100)
        ) {

            if (!this.state.bottomAlreadyReached && !this.state.loadingMoreVideos) {
                this.setState({bottom: true, bottomAlreadyReached: true, loadingMoreVideos: true});
                console.log('reached bottom')
            }
        } else {
            console.log("not yet")
        }
    }

    render() {
        return (
            <div onScroll={this.onScroll} className="row trending-content">
                {this.props.store.trendingVideos.map(video => {
                    return (
                        <div key={video.id} className="col-md-12 col-sm-12 col-lg-12 col-xl-6 mt-3">
                            <YoutubeVideo video={video}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default inject("store")(observer(Trending));
