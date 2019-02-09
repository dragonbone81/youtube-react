import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class Home extends Component {
    componentDidMount() {
        // this.props.store.youtubeSearch("minecraft")
    }

    render() {
        return (
            <div>
                hi
            </div>
        );
    }
}

export default inject("store")(observer(Home));
