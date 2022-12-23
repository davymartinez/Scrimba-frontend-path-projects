let myEmojis = []
const emojisFromLocalStorage = JSON.parse(localStorage.getItem("myEmojis"))
const emojiContainer = document.getElementById("emoji-container")
const emojiInput = document.getElementById("emoji-input")
const pushBtn = document.getElementById("push-btn")
const unshiftBtn = document.getElementById("unshift-btn")
const popBtn = document.getElementById("pop-btn")
const shiftBtn = document.getElementById("shift-btn")

if (emojisFromLocalStorage) {
    myEmojis = emojisFromLocalStorage
    renderEmojis(myEmojis)
}

function renderEmojis() {
    emojiContainer.innerHTML = ""
    for (let i = 0; i < myEmojis.length; i++) {
        const emoji = document.createElement('span')
        emoji.textContent = myEmojis[i]
        emojiContainer.append(emoji)
    }
}

renderEmojis()

document.addEventListener("click", function(event) {
    if (event.target === pushBtn) {
        myEmojis.push(emojiInput.value)
    } else if (event.target === unshiftBtn) {
        myEmojis.unshift(emojiInput.value)
    }
    localStorage.setItem("myEmojis", JSON.stringify(myEmojis))
    if (emojiInput.value) {
        emojiInput.value = ""
        renderEmojis()
    }
})

document.addEventListener("click", function(event) {
    if (event.target === popBtn) {
        myEmojis.pop()
    } else if (event.target === shiftBtn) {
        myEmojis.shift()
    }
    localStorage.setItem("myEmojis", JSON.stringify(myEmojis))
    renderEmojis()
})
