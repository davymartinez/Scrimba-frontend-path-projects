/* Open Movie Database: https://www.omdbapi.com/ 
Key: a7e45094
*/

const filmList = document.getElementById("film-list")
const emptyStateContainer = document.getElementById("empty-state-container")
const filmItemContainer = document.getElementById("film-item-container")
const searchForm = document.getElementById("search-form")
const filmsFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"))
const apiKey = "a7e45094"
let resultsArray = []
let watchlistArray = []

document.addEventListener("click", function(e) {
    if (e.target.dataset.addFilm) {
        handleAddFilmBtnClick(e.target.dataset.addFilm)
    }
})

function generateMovieHtml(film, list) {
    list.innerHTML += `
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
                        <p id="watchlist-add"><button id="watchlist-btn" data-add-film=${film.imdbID}>+</button> Watchlist</p>
                    </div>
                    <p id="film-plot">${film.Plot}</p>
                </div>
            </div>
        </div>
        <hr>
    `
}

/* 
OMDb API search first returns an object with just Title, Year, imdbID, Type & Poster, which makes this a two-step search
From this first fetch we take the value of imdbID to iterate on the next search performed by the fetchMovies() function
*/
function fetchSearch(title) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&type=movie`)
        .then(res => res.json())
        .then(data => {
            let searchResults = data.Search

            if (searchResults === undefined) {
                filmList.innerHTML = `
                    <div id="no-results-msg">
                        <p id="no-results-msg-p">Unable to find what you're looking for. Please try another search.</p>
                    </div>
                `
            }
            
            for (const result of searchResults) {
                fetchMovies(result)
            }
            
            filmList.style.flexDirection = "column"
        })
}

function fetchMovies(result) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${result.imdbID}`)
        .then(res => res.json())
        .then(data => {
            let { Title, Ratings: [{ Value: imdbRating }], Runtime, Genre, Plot, Poster } = data

            /* Some results have no poster and come up with "N/A", so we replace those with a placeholder img */
            Poster === "N/A" ? Poster = "img/poster-not-available.jpg" : Poster

            let resultObj = {
                imdbID: result.imdbID,
                Title: Title,
                imdbRating: imdbRating,
                Runtime: Runtime,
                Genre: Genre,
                Plot: Plot,
                Poster: Poster
            }
            
            resultsArray.push(resultObj)

            filmList.innerHTML = ""

            for (const result of resultsArray) {
                generateMovieHtml(result, filmList)
            }
        })
}

function handleAddFilmBtnClick(filmId) {
    const targetFilm = resultsArray.filter(function(item) {
        return (item.imdbID === filmId)
    })[0]

    if (filmsFromLocalStorage) {
        watchlistArray = filmsFromLocalStorage
    }

    if (targetFilm !== undefined) {
        watchlistArray.push(targetFilm)
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray) )
}

filmList.innerHTML = `
        <div id="empty-state-container">
            <img src="img/film-icon.png" alt="film icon" id="film-icon">
            <p id="empty-state-p">Start exploring</p>
        </div>
    `

searchForm.addEventListener("submit", function(e) {
    e.preventDefault()
    resultsArray.splice(0) // reset the results array so search results start from a blank slate every time

    const titleSearch = document.getElementById("title-field").value

    fetchSearch(titleSearch)
})

