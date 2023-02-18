const viewMore = document.getElementById("view-more")

viewMore.addEventListener("click", handleViewMore)

function handleViewMore() {
    let toggleText = document.getElementById("hidden")
    let viewMore = document.getElementById("view-more")
    toggleText.classList.toggle("hidden")
    viewMore.innerText = "Toggle View More"
}