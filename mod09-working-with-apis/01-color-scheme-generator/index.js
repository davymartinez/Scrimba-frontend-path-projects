let colorPicker
const defaultColor = "#0080FF"
const getColorBtn = document.getElementById("get-color-btn")
const colorContainer = document.getElementById("color-container")
const colorBar = document.getElementById("color-bar")
const modal = document.getElementById("modal")
const modalCloseBtn = document.getElementById("modal-close-btn")
const modalText = document.getElementById("modal-text")

window.addEventListener("load", startup, false)

function startup() {
    colorPicker = document.getElementById("color-picker")
    colorPicker.value = defaultColor
    colorPicker.addEventListener("input", getColor, false)
    colorPicker.select()
}

function getColor(e) {
    let updatedColor = e.target.value
    return updatedColor
}

getColorBtn.addEventListener("click", function(e) {
    const colorsArray = []
    e.preventDefault()

    const hexColor = colorPicker.value.slice(1)
    const selectedMode = document.getElementById("mode-select").value
    const colorsApiCall = `https://www.thecolorapi.com/scheme?hex=${hexColor}&format=json&mode=${selectedMode}&count=5`
    const colorBarFooter = document.getElementById("generator-footer")

    fetch(colorsApiCall, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            colorContainer.innerHTML = ""
            colorBarFooter.innerHTML = ""
            for (color of data.colors) {
                let { hex: { value } } = color
                colorsArray.push(value)
            }
            
            for (color in colorsArray) {
                colorContainer.innerHTML += `
                    <div id="color-bar" style="background:${colorsArray[color]}"></div>
                `
                colorBarFooter.innerHTML += `
                    <div class="hex">${colorsArray[color]}</div>
                `
            }
        })
})

document.addEventListener("click", (e) => {
    const bgColor = e.target.style.backgroundColor
    if (!bgColor) {
        return
    }

    const rgbArray = bgColor.split("(")[1].split(")")[0].split(",")
    const hexValue = rgbArray.reduce((acc, curr) => {
        const hex = parseInt(curr).toString(16).padStart(2, "0")
        return acc + hex
    }, "#")

    navigator.clipboard.writeText(hexValue)
    modal.style.display = "block"
    modalText.innerText = `Color ${hexValue} has been copied to clipboard`
})

modalCloseBtn.addEventListener("click", (e) => {
    modal.style.display = "none"
})
