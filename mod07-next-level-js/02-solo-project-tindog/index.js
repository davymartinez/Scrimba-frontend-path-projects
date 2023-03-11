import Dog from './Dog.js'
import dogs from './data.js'

document.addEventListener('click', (e) => {
    if (e.target.id === 'like-btn') {
        document.getElementById('nope-btn').disabled = true
        dog.setMatchStatus('like')
        setTimeout(() => {
            document.getElementById('nope-btn').disabled = false
        }, 1100)
        swipe()
    } else if (e.target.id === 'nope-btn') {
        document.getElementById('like-btn').disabled = true
        dog.setMatchStatus('nope')
        dog.hasBeenSwiped = true
        setTimeout(() => {
            document.getElementById('like-btn').disabled = false
        }, 1100)
        swipe()
    }
})

let dog = new Dog(getNextDog())

function swipe() {
    setTimeout(() => {
        if (dogs.length !== 0) {
            dog = getNextDog()
            dog.setMatchStatus('none')
            render()
        } else if (!dogs[0]) {
            getEndOfListHtml()
        }
    }, 1000)
}

function getNextDog() {
    const nextDogData = dogs.shift()
    if (nextDogData) {
        return new Dog(nextDogData)
    } 
    return nextDogData ? new Dog(nextDogData) : {}
}

function getEndOfListHtml() {
    document.getElementsByTagName('main')[0].innerHTML = `
        <div class="end-message"><h1>There are no more dogs in your area!</h1></div>
    `
}

function render() {
    dog.getDogHtml()
}

render()

export { getNextDog, render, swipe }