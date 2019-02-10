const BASE_URL = "https://www.googleapis.com/youtube/v3";
const youtubeSearch = (API_KEY, query, maxResults = 25) => {
    fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(response));
};
const getTrendingVideos = (access_token) => {
    const parts = ["id", "snippet"];
    return fetch(`${BASE_URL}/videos?maxResults=50&part=${encodeURIComponent(parts.join(","))}&chart=mostPopular&regionCode=US`, {headers: {"Authorization": "Bearer " + access_token}})
        .then(response => response.json())
        .then(data => data.items || "ERROR");
};
const youtubeGetRecommendedVideos = (API_KEY, query, maxResults = 25) => {
    fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(response));
};

export {youtubeSearch, getTrendingVideos}