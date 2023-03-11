class Dog {
    constructor(data) {
        Object.assign(this, data)
    }

    getDogHtml() {
        const { name, age, bio, avatar } = this
        document.getElementById('bio-container').innerHTML = `
            <h1 class="dog-name">${name}, ${age}</h1>
            <p class="dog-bio">${bio}</p>
        `
        document.getElementById('img-container').innerHTML = `
            <img src="${avatar}" alt="teddy dog" class="dog-img">
        `
    }

    setMatchStatus(status) {
        let { hasBeenLiked, hasBeenSwiped } = this
        if (status === 'like') {
            hasBeenLiked = true
            document.getElementById('badge-container').innerHTML = `
                <img src="images/badge-like.png" alt="liked badge" class="badge-like" id="badge-like">
            `
        } else if (status === 'nope') {
            document.getElementById('badge-container').innerHTML = `
                <img src="images/badge-nope.png" alt="nope badge" class="badge-nope" id="badge-nope">
            `
        } else if (status === 'none') {
            document.getElementById('badge-container').innerHTML = ''
        }
    }
}

export default Dog