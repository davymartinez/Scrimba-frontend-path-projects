/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputVal = document.getElementById("input-box-number")
const convertBtn = document.getElementById("convert-btn")
const mtsFeetConv = document.getElementById("mts-ft-conversion")
const ltsGalConv = document.getElementById("lts-gal-conversion")
const kgsLbsConv = document.getElementById("kgs-lbs-conversion")

let mtsToFeet = ""
let feetToMts = ""
let ltrToGal = ""
let galToLtr = ""
let kgsToLbs = ""
let lbsToKgs = ""

let mtsToFeetConversion = ""
let ltsToGalConversion = ""
let kgsToLbsConversion = ""

function calculate() {
    mtsToFeet = (inputVal.value * 3.281).toFixed(2)
    feetToMts = (inputVal.value / 3.281).toFixed(2)
    ltrToGal = (inputVal.value * 0.264).toFixed(2)
    galToLtr = (inputVal.value / 0.264).toFixed(2)
    kgsToLbs = (inputVal.value * 2.204).toFixed(2)
    lbsToKgs = (inputVal.value / 2.204).toFixed(2)
}

function render() {
    
    mtsToFeetConversion = `${inputVal.value} meters = ${mtsToFeet} feet | ${inputVal.value} feet = ${feetToMts} meters`
    ltsToGalConversion = `${inputVal.value} liters = ${ltrToGal} gallons | ${inputVal.value} gallons = ${galToLtr} liters`
    kgsToLbsConversion = `${inputVal.value} kilos = ${kgsToLbs} pounds | ${inputVal.value} pounds = ${lbsToKgs} kilograms`
    
    mtsFeetConv.innerHTML = mtsToFeetConversion
    ltsGalConv.innerHTML = ltsToGalConversion
    kgsLbsConv.innerHTML = kgsToLbsConversion
}

convertBtn.addEventListener("click", function() {
    calculate()
    render()
})