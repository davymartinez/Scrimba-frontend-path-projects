const posts = [
    {
        image: "images/room-01.png",
        alt: "Image of Room 01",
        caption: "Just 200 mts away from the beach, with slow Wi-Fi and a balcony where you can see the back of the neighboring building. But it's too damn expensive!",
        isExclusive: true
    }, 
    {
        image: "images/room-02.png",
        alt: "Image of Room 02",
        caption: "Right on top of the main commercial street of the city, as busy as it gets, night and day. Good luck trying to get some rest, especially at night!",
        isExclusive: false
    }, 
    {
        image: "images/room-03.png",
        alt: "Image of Room 03",
        caption: "If you don't have a car, get ready to empty your wallet paying for taxis and/or renting a car, because this one is kilometers away from anything of worth!",
        isExclusive: false
    }
]

const post = document.querySelector(".post")

function renderPostImg(post) {
    if (post.isExclusive) {
        return `
            <img class="post-img" src="${post.image}" alt="${post.alt}">
            <div class="exclusive-banner">
                Exclusive
            </div>
        `
    } else {
        return `
            <img class="post-img" src="${post.image}" alt="${post.alt}">
        `
    }
}

function renderCaptionContainer(post) {
    return `
        <div class="caption-container">
            <p class="img-caption">${post.caption}</p>
            <button class="cancel-btn">Cancel</button>
        </div>
    `
}

function renderPosts() {
    post.innerHTML = ""
    for (let i = 0; i < posts.length; i++) {
        post.innerHTML += renderPostImg(posts[i]) + renderCaptionContainer(posts[i])
    }
}

renderPosts()