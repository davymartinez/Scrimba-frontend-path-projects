const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let passOne = document.getElementById("pw1")
let passTwo = document.getElementById("pw2")
let passLength = document.querySelector("input")
let rangeVal = document.getElementById("rangevalue")
rangeVal.textContent = passLength.value

function passGen() {
    passOne.textContent = ""
    passTwo.textContent = ""
    let pwLength = Number(passLength.value)
    for (i = 0; i < pwLength; i++) {
        let randomChar = Math.floor(Math.random() * characters.length)
        passOne.textContent += characters[randomChar]
    }
    for (i = 0; i < pwLength; i++) {
        let randomChar = Math.floor(Math.random() * characters.length)
        passTwo.textContent += characters[randomChar]
    }
}

function clickToCopy(e) {
    let copyPass = e.target.innerText
    navigator.clipboard.writeText(copyPass).then(
        function() {
            window.alert("Password copied to clipboard!")
        },
        function() {
            window.alert("Sorry, your browser does not support the Clipboard API")
        }
    )
}