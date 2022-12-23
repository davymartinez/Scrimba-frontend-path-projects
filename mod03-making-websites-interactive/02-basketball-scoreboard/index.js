let homeScore = document.getElementById("home-score-p")
let guestScore = document.getElementById("guest-score-p")
let homeBtn01 = document.getElementById("home-btn-1")
let guestBtn01 = document.getElementById("guest-btn-1")
let homeScoreCount = 0
let guestScoreCount = 0

function highlight() {
    if (homeScoreCount > guestScoreCount) {
        homeScore.style.color = "#34D399"
        guestScore.style.color = "#F94F6D"
    } else if (homeScoreCount < guestScoreCount) {
        homeScore.style.color = "#F94F6D"
        guestScore.style.color = "#34D399"
    } else {
        homeScore.style.color = guestScore.style.color = "#38BDF8"
    }
}

function add1(clickedBtn) {
    if (clickedBtn == "home-btn-1") {
        homeScoreCount += 1
        homeScore.textContent = homeScoreCount   
    } else if (clickedBtn == "guest-btn-1") {
        guestScoreCount += 1
        guestScore.textContent = guestScoreCount
    }
    highlight()
}
 
function add2(clickedBtn) {
    if (clickedBtn == "home-btn-2") {
        homeScoreCount += 2
        homeScore.textContent = homeScoreCount   
    } else if (clickedBtn == "guest-btn-2") {
        guestScoreCount += 2
        guestScore.textContent = guestScoreCount
    }
    highlight()
}
 
function add3(clickedBtn) {
    if (clickedBtn == "home-btn-3") {
        homeScoreCount += 3
        homeScore.textContent = homeScoreCount   
    } else if (clickedBtn == "guest-btn-3") {
        guestScoreCount += 3
        guestScore.textContent = guestScoreCount
    }
    highlight()
}

function newGame() {
    homeScoreCount = 0
    guestScoreCount = 0
    homeScore.textContent = homeScoreCount
    guestScore.textContent = guestScoreCount
    homeScore.style.color = "#F94F6D"
    guestScore.style.color = "#F94F6D"
}