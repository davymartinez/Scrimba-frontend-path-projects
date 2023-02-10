const viewMore = document.getElementById("view-more")

viewMore.addEventListener("click", handleViewMore)

function handleViewMore() {
    document.getElementById("hidden").classList.toggle("hidden")
}