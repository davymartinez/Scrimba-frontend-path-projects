let myFilms = []
const watchlistFilmList = document.getElementById("watchlist-film-list")
const filmsFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"))

if (filmsFromLocalStorage.length !== 0) {
    myFilms = filmsFromLocalStorage
    renderWatchList(myFilms)
} else {
    watchlistFilmList.innerHTML = `
        <div id="empty-watchlist">
            <p id="empty-watchlist-p">Your watchlist is looking a little empty...</p>
            <div id="empty-watchlist-cta">
                <img src="img/plus-icon.png" id="plus-icon">
                <p><a href="index.html" id="empty-watchlist-cta-p">Let's add some movies!</p>
            </div>
        </div>
    `
}

document.addEventListener("click", function(e) {
    if (e.target.dataset.removeFilm) {
        handleRemoveFilmBtnClick(e.target.dataset.removeFilm)
    }
})

function handleRemoveFilmBtnClick(filmId) {
    const targetFilm = filmsFromLocalStorage.find(function(item) {
        return (item.imdbID === filmId)
    })
    
    filmsFromLocalStorage.splice(filmsFromLocalStorage.indexOf(targetFilm), 1)
    localStorage.setItem("watchlist", JSON.stringify(filmsFromLocalStorage))
    renderWatchList(filmsFromLocalStorage)
}

function renderWatchList(watchListArray) {
    watchlistFilmList.innerHTML = ""
    for (const film of watchListArray) {
        watchlistFilmList.innerHTML += `
            <div id="film-item-container">
                <div id="film-item">
                    <div id="film-poster-container">
                        <img src="${film.Poster}" id="film-poster">
                    </div>
                    <div id="film-info-container">
                        <div id="film-info-header">
                            <h2 id="film-title">${film.Title}</h2>
                            <p id="film-rating">⭐️ ${film.imdbRating}</p>
                        </div>
                        <div id="film-info-subheader">
                            <p id="film-runtime">${film.Runtime}</p>
                            <p id="film-genre">${film.Genre}</p>
                            <p id="watchlist-add"><button id="watchlist-btn" data-remove-film=${film.imdbID}>-</button> Remove</p>
                        </div>
                        <p id="film-plot">${film.Plot}</p>
                    </div>
                </div>
            </div>
            <hr>
        `
    }
}
