const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postContent = document.querySelector(".post-content")

function renderUserInfo(post) {
    return `
        <section class="user-info">
            <img src="${post.avatar}" class="post-avatar">
            <div class="user-and-location">
                <h1 class="user-full-name">${post.name}</h1>
                <h2 class="location">${post.location}</h2>
            </div>
        </section>
    `
}

function renderPostImage(post) {
    return `
        <section class="post-image-container">
            <img class="post-image" src="${post.post}">
        </section>
    `
}

function renderPostBody(post) {
    return `
        <section class="post-body">
            <div class="post-body-icons">
                <img src="images/icon-heart.png" class="like-icon">
                <img src="images/icon-comment.png" class="comment-icon">
                <img src="images/icon-dm.png" class="share-icon">
            </div>
            <div class="post-body-text">
                <p class="like-count">${post.likes} likes</p>
                <p class="user-comment"><span class="username">${post.username}</span> ${post.comment}</p>
            </div>
        </section>
        <div class="post-separator"></div>
    `
}

function renderPosts() {
    postContent.innerHTML = ""
    for (let i = 0; i < posts.length; i++) {
        postContent.innerHTML += renderUserInfo(posts[i]) + renderPostImage(posts[i]) + renderPostBody(posts[i])
    }
}


renderPosts()
