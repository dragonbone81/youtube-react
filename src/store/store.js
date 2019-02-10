import {decorate, configure, observable, action, computed, runInAction} from 'mobx'
import {youtubeSearch, getTrendingVideos, getVideoInfo, getChannelInfo, getRelatedVideos, getComments} from '../api/api'

configure({enforceActions: "observed"});

class Store {
    API_KEY = "AIzaSyDa3twZvyiLDhDQUFu8s-dScTYzp4AnVvY";
    CLIENT_ID = "63361130758-e6qssvaffdc7ohhmin7lhmss4vfd6gga.apps.googleusercontent.com";
    REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL ||"http://localhost:3000/redirect";
    ACCESS_TOKEN = localStorage.getItem("access_token") || "";
    querySearchTerm = "";
    trendingVideos = {};
    currentVideo = {};
    currentChannelInfo = {};
    relatedVideos = [];
    comments = [];


    get loggedIn() {
        if (this.ACCESS_TOKEN === "") {
            return false;
        } else {
            return true
        }
    }

    get currentVideoExists() {
        return !!this.currentVideo.id;
    }

    setAccessToken = (token) => {
        this.ACCESS_TOKEN = token;
    };
    changeQuerySearchTerm = (newTerm) => {
        this.querySearchTerm = newTerm;
    };
    youtubeSearch = () => {
        if (this.querySearchTerm !== "") {
            youtubeSearch(this.API_KEY, this.querySearchTerm);
        }
    };

    get trendingVideosArr() {
        return this.trendingVideos.items || [];
    }

    get reachedEndOfTrending() {
        return !this.trendingVideos.nextPageToken;
    }

    getComments = (videoID) => {
        getComments(this.ACCESS_TOKEN, videoID).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            }
            else {
                runInAction(() => {
                    this.comments = data;
                });
            }
        })
    };
    getRelatedVideos = (videoID) => {
        getRelatedVideos(this.ACCESS_TOKEN, videoID).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            }
            else {
                runInAction(() => {
                    this.relatedVideos = data;
                });
            }
        })
    };
    getCurrentChannelInfo = (channelID) => {
        getChannelInfo(this.ACCESS_TOKEN, channelID).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            } else if (data === "ERROR_LENGTH") {
                console.warn("channelID", data);
            }
            else {
                runInAction(() => {
                    this.currentChannelInfo = data;
                });
            }
        })
    };
    resetCurrentVideo = () => {
        this.currentChannelInfo = {};
        this.currentVideo = {};
        this.relatedVideos = [];
    };
    changeCurrentVideo = (videoID) => {
        getVideoInfo(this.ACCESS_TOKEN, videoID).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            } else if (data === "ERROR_LENGTH") {
                console.warn("videoID", data);
            }
            else {
                this.getCurrentChannelInfo(data.snippet.channelId);
                runInAction(() => {
                    this.currentVideo = data;
                });
            }
        });
        this.getRelatedVideos(videoID);
        this.getComments(videoID);
    };
    getCurrentVideo = (videoID) => {
        getVideoInfo(this.ACCESS_TOKEN, videoID).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            } else if (data === "ERROR_LENGTH") {
                console.warn("videoID", data);
            }
            else {
                this.getCurrentChannelInfo(data.snippet.channelId);
                runInAction(() => {
                    this.currentVideo = data;
                });
            }
        });
        this.getRelatedVideos(videoID);
        this.getComments(videoID);
    };
    getTrendingVideos = () => {
        getTrendingVideos(this.ACCESS_TOKEN).then(data => {
            if (data === "ERROR") {
                runInAction(() => {
                    this.ACCESS_TOKEN = "";
                });
            } else {
                runInAction(() => {
                    this.trendingVideos = data
                });
            }
        })
    };
    getNextTrendingVideos = () => {
        if (!this.reachedEndOfTrending) {
            return getTrendingVideos(this.ACCESS_TOKEN, this.trendingVideos.nextPageToken).then(data => {
                if (data === "ERROR") {
                    runInAction(() => {
                        this.ACCESS_TOKEN = "";
                    });
                } else {
                    runInAction(() => {
                        this.trendingVideos = {...data, items: [...this.trendingVideos.items, ...data.items]}
                    });
                }
            })
        } else {
            return Promise.resolve();
        }
    };
    loginRedirect = () => {
        const scopes = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.force-ssl"];
        window.location = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${encodeURIComponent(scopes.join(" "))}`;
    }
}

decorate(Store, {
    querySearchTerm: observable,
    ACCESS_TOKEN: observable,
    trendingVideos: observable,
    currentVideo: observable,
    comments: observable,
    currentChannelInfo: observable,
    relatedVideos: observable,
    changeQuerySearchTerm: action,
    setAccessToken: action,
    resetCurrentVideo: action,
    loggedIn: computed,
    trendingVideosArr: computed,
    reachedEndOfTrending: computed,
    currentVideoExists: computed,
});

export default new Store();