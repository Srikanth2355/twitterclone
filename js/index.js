const URL = "http://localhost:3000/tweets";

const onenter = (e)=>{
    if(e.key === "Enter"){
        getTwitterData()
    }
}
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
    const query = document.getElementById("user-search-input").value;
    if(!query) return;
    const encodedquery = encodeURIComponent(query);
    
    const fullurl = `${URL}?q=${encodedquery}&count=10`;
    fetch(fullurl).then((response)=> {
        return response.json();
    })
    .then((data)=> {
        buildTweets(data.statuses);
    })
    
}


/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    console.log(tweets);
    let twittercontent ="";
    tweets.map((tweet)=>{
        twittercontent += `
        <div class="tweet-container">
            <div class="tweet-user-info">
                <div class="tweet-user-profile">
    
                </div>
                <div class="tweet-user-name-container">
                    <div class="tweet-user-fullname">
                        Srikanth
                    </div>
                    <div class="tweet-user-username">
                        @srikanth
                    </div>
                </div>
            </div>
            <div class="tweet-images-container">
                <div class="tweet-image">
    
                </div>
            </div>
            <div class="tweet-text-container">
                ${tweet.full_text}
            </div>
            <div class="tweet-date-container">
                20 hours ago
            </div>
        </div>
        `
    })

    document.querySelector(".tweets-list").innerHTML = twittercontent;
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {

}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}
