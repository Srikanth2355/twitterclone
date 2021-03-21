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
        const createddate = moment(tweet.created_at,).fromNow();
        // const date = tweet.created_at;
        // var formatdate = date.slice(4,20);
        // formatdate += date.slice(26,32);
        // var m = moment(formatdate).format("MM-DD-h:mm:ss-YYYY");
        // var createddate =moment(m).fromNow()
        // console.log(createddate);
        twittercontent += `
        <div class="tweet-container">
            <div class="tweet-user-info">
                <div class="tweet-user-profile" style="background-image:url(${tweet.user.profile_image_url_https})">
    
                </div>
                <div class="tweet-user-name-container">
                    <div class="tweet-user-fullname">
                        ${tweet.user.name}
                    </div>
                    <div class="tweet-user-username">
                        @${tweet.user.screen_name}
                    </div>
                </div>
            </div>
            `

            if(tweet.extended_entities && tweet.extended_entities.media.length > 0){
               twittercontent += buildImages(tweet.extended_entities.media);
               twittercontent += buildVideo(tweet.extended_entities.media);
            }
            
            twittercontent += `
            <div class="tweet-text-container">
                ${tweet.full_text}
            </div>
            <div class="tweet-date-container">
                ${createddate}
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
    let imagescontent = `<div class="tweet-images-container">`;
    let imageexists = false;
    mediaList.map((media) => {
        if(media.type === "photo"){
            imageexists = true;
           imagescontent +=  `<div class="tweet-image" style="background-image: url(${media.media_url_https})">
           </div>`
        }
    });
    imagescontent += `</div>`
    return imageexists ? imagescontent : "";
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
    let videocontent = `<div class="tweet-video-container">`;
    let videoexists = false;
    mediaList.map((media) => {
        if(media.type === "video"){
            videoexists = true;
            videocontent +=  `<video controls>
           <source src="${media.video_info.variants[0]["url"]}" type="video/mp4">
       </video>`
        } else if(media.type === "animated_gif"){
            videoexists = true;
            videocontent +=  `<video loop autoplay>
           <source src="${media.video_info.variants[0]["url"]}" type="video/mp4">
            </video>`
        }
    });
    videocontent += `</div>`
    return videoexists ? videocontent : "";
}
