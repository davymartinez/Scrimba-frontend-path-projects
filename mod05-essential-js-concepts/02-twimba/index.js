import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    } else if (e.target.dataset.addReply) {
        handleAddReplyClick(e.target.dataset.addReply)
    } else if (e.target.dataset.delete) {
        handleDeleteTweet(e.target.dataset.delete)
    } else if (e.target.dataset.deleteReply) {
        handleDeleteReply(e.target.dataset.deleteReply)
    }
})

function saveToLocalStorage() {
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
}

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function renderReplyInputArea(replyId) {
    let replyInputAreaHtml = ``
    
    replyInputAreaHtml += `
        <div class="reply-input-area">
            <img src="images/scrimbalogo.png" class="profile-pic">
            <textarea placeholder="Tweet your reply" class="reply-input" data-reply-input="${replyId}"></textarea>
            <button class="reply-btn" id="reply-btn" data-add-reply="${replyId}">Reply</button>
        </div>
    `
    return replyInputAreaHtml
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input')

    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }
}

function handleAddReplyClick(replyId) {
    const targetReplyObj = tweetsData.find(tweet => tweet.uuid === replyId)
    
    if (document.querySelector(`[data-reply-input="${replyId}"]`).value) {
        targetReplyObj.replies.push({
            handle: `@Twimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: document.querySelector(`[data-reply-input="${replyId}"]`).value,
            uuid: uuidv4()
        })
    }
    render()
    handleReplyClick(replyId)
}

function handleDeleteTweet(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweet.uuid === tweetId)
    
    tweetsData.splice(tweetsData.indexOf(targetTweetObj), 1)
    render()
}

function handleDeleteReply(replyId) {
    const targetReplyObj = tweetsData.find(tweet => tweet.replies.find(reply => reply.uuid === replyId)).replies
    console.log(targetReplyObj)
    const targetReply = targetReplyObj.find(reply => reply.uuid === replyId)
    console.log(targetReply)
    const tweetId = tweetsData.find(tweet => tweet.replies.find(reply => reply.uuid === replyId)).uuid
    
    targetReplyObj.splice(targetReplyObj.indexOf(targetReply), 1)
    render()
    saveToLocalStorage()
    handleReplyClick(tweetId)
}

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function(tweet) {
        let likeIconClass = ''

        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''

        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-trash" data-delete-reply="${reply.uuid}"></i>
                                </span>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-trash" data-delete="${tweet.uuid}"></i>
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${renderReplyInputArea(tweet.uuid)}
                    ${repliesHtml}
                </div>   
            </div>
        `
    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
    saveToLocalStorage()
}

render()
