import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class Redirect extends Component {
    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        const urlSearchSpace = new URLSearchParams(window.location.href.split("#").pop());
        const token = urlSearchSpace.get("access_token");
        this.props.store.setAccessToken(token);
        localStorage.setItem("access_token", token);
        this.props.history.push("/trending");
        return null
    };

    render() {
        return (
            null
        )
    }
}


export default inject("store")(observer(Redirect));
