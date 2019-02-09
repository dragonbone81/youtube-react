const BASE_URL = "https://www.googleapis.com/youtube/v3";

const youtubeSearch = (API_KEY, query, maxResults = 25) => {
    fetch(`${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(response));
};

export {youtubeSearch}