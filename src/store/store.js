import {decorate, configure, observable, action, computed, runInAction} from 'mobx'
import {youtubeSearch, getTrendingVideos} from '../api/api'

configure({enforceActions: "observed"});

class Store {
    API_KEY = "AIzaSyDa3twZvyiLDhDQUFu8s-dScTYzp4AnVvY";
    CLIENT_ID = "63361130758-e6qssvaffdc7ohhmin7lhmss4vfd6gga.apps.googleusercontent.com";
    REDIRECT_URI = "http://localhost:3000/redirect";
    ACCESS_TOKEN = localStorage.getItem("access_token") || "";
    querySearchTerm = "";
    trendingVideos = {};


    get loggedIn() {
        if (this.ACCESS_TOKEN === "") {
            return false;
        } else {
            return true
        }
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
        const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];
        window.location = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${encodeURIComponent(scopes.join(" "))}`;
    }
}

decorate(Store, {
    querySearchTerm: observable,
    ACCESS_TOKEN: observable,
    trendingVideos: observable,
    changeQuerySearchTerm: action,
    setAccessToken: action,
    loggedIn: computed,
    trendingVideosArr: computed,
    reachedEndOfTrending: computed,
});

export default new Store();