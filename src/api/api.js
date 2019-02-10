const BASE_URL = "https://www.googleapis.com/youtube/v3";
const youtubeSearch = (API_KEY, query, maxResults = 25) => {
    fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(response));
};
const getTrendingVideos = (access_token, nextPage = "") => {
    const parts = ["id", "snippet", "statistics"];
    return fetch(`${BASE_URL}/videos?maxResults=50&pageToken=${nextPage}&part=${encodeURIComponent(parts.join(","))}&chart=mostPopular&regionCode=US`, {headers: {"Authorization": "Bearer " + access_token}})
        .then(response => response.json())
        .then(data => data.items ? data : "ERROR");
};
const getVideoInfo = (access_token, videoID) => {
    const parts = ["id", "snippet", "statistics"];
    return fetch(`${BASE_URL}/videos?part=${encodeURIComponent(parts.join(","))}&id=${videoID}`, {headers: {"Authorization": "Bearer " + access_token}})
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length === 1)
                return data.items[0];
            else if (data.items && data.items.length !== 1)
                return "ERROR_LENGTH";
            else
                return "ERROR";
        });
};
const getChannelInfo = (access_token, channelID) => {
    const parts = ["snippet"];
    return fetch(`${BASE_URL}/channels?part=${encodeURIComponent(parts.join(","))}&id=${channelID}`, {headers: {"Authorization": "Bearer " + access_token}})
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length === 1)
                return data.items[0];
            else if (data.items && data.items.length !== 1)
                return "ERROR_LENGTH";
            else
                return "ERROR";
        });
};
const youtubeGetRecommendedVideos = (API_KEY, query, maxResults = 25) => {
    fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(response));
};

export {youtubeSearch, getTrendingVideos, getVideoInfo, getChannelInfo}