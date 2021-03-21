const URL = "https://radiant-spire-70727.herokuapp.com/tweets";
let nextpageurl = null;

const onenter = (e)=>{
    if(e.key === "Enter"){
        getTwitterData()
    }
}

const onnextpage = () => {
    if(nextpageurl){
        getTwitterData(true)
    }
}
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = (nextPage = false) => {
    const query = document.getElementById("user-search-input").value;
    if(!query) return;
    const encodedquery = encodeURIComponent(query);
    // console.log(encodedquery);
    let fullurl = `${URL}?q=${encodedquery}&count=10`;
    if(nextPage && nextpageurl){
         fullurl = nextpageurl;
    }

    fetch(fullurl).then((response)=> {
        return response.json();
    })
    .then((data)=> {
        buildTweets(data.statuses,nextPage);
        saveNextPage(data.search_metadata);
        nextPageButtonVisibility(data.search_metadata);
    })
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
    if(metadata.next_results){
        nextpageurl = `${URL}${metadata.next_results}`;
    } else {
        nextpageurl = null;
    }
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
    let userclick = e.innerText;
    document.getElementById("user-search-input").value = userclick;
    getTwitterData()

}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
    if(metadata.next_results){
        document.querySelector(".next-page-container").style.visibility = "visible";
    } else {
        document.querySelector(".next-page-container").style.visibility = "hidden";

    }
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let profile = `<div class="profile" style="background-image:url(${tweets[0].user.profile_image_url_https})"></div>`
    document.querySelector(".profile-container").innerHTML = profile;
    let twittercontent ="";
    tweets.map((tweet)=>{
        const createddate = moment(tweet.created_at,).fromNow();
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

    if(nextPage){
        document.querySelector(".tweets-list").insertAdjacentHTML("beforeend",twittercontent);
    } else {
     document.querySelector(".tweets-list").innerHTML = twittercontent;

    }
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
            const videovariant = media.video_info.variants.find((variant)=>variant.content_type == "video/mp4")
            videocontent +=  `<video controls>
           <source src="${videovariant.url}" type="video/mp4">
       </video>`
        } else if(media.type === "animated_gif"){
            videoexists = true;
            const videovariant = media.video_info.variants.find((variant)=>variant.content_type == "video/mp4")
            videocontent +=  `<video loop autoplay>
           <source src="${videovariant.url}" type="video/mp4">
            </video>`
        }
    });
    videocontent += `</div>`
    return videoexists ? videocontent : "";
}
