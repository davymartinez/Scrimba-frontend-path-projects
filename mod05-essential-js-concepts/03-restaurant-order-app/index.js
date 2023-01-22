import { menuArray } from "./data.js"

document.addEventListener("click", function(e) {
    if (e.target.dataset.addItem) {
        handleAddBtnClick(e.target.dataset.addItem)
    } 
    if (e.target.dataset.deleteItem) {
        handleRemoveBtnClick(e.target.dataset.deleteItem)
    }
    if (e.target.id === "order-btn") {
        displayPaymentModal()
    }
})

const menu = document.getElementById("menu")
const checkout = document.getElementById("checkout")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const thanksMsg = document.getElementById("thanks-msg")
const overlay = document.querySelector(".overlay")
const orderArray = []
const priceArray = []

function renderMenu() {
    let menuHtml = ``

    menuArray.forEach(function(item) {
        menuHtml += `
            <div class="menu-item">
                <div class="item-icon">${item.emoji}</div>
                <div class="menu-text">
                    <h3 class="item">${item.name}</h3>
                    <p class="ingredients">${item.ingredients.join(", ")}</p>
                    <p class="price">$${item.price}</p>
                </div>
            <button class="add-btn" id="add-btn" data-add-item="${item.id}">+</button>
            </div>
        `
    })

    return menuHtml
}

function handleAddBtnClick(itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id === parseInt(itemId, 10)
    })[0]

    orderArray.push({
        name: targetItemObj.name, 
        price: targetItemObj.price
    })

    orderArray.forEach((order, i) => order.id = i + 1)
    priceArray.push(targetItemObj.price)

    render()
}

function handleRemoveBtnClick(orderId) {
    const targetOrderObj = orderArray.find(order => order.id === parseInt(orderId, 10))

    orderArray.splice(orderArray.indexOf(targetOrderObj), 1)
    priceArray.splice(priceArray.indexOf(targetOrderObj), 1)

    render()
}

function getOrdersHtml() {
    let ordersHtml = ``

    orderArray.forEach(function(order) {
        ordersHtml += `
            <div class="checkout-item">
                <div class="item-button-group">
                    <div class="added-checkout-item">${order.name}</div>
                    <button class="remove-item" id="remove-item" data-delete-item="${order.id}">remove</button>
                </div> 
                <div class="item-price">$${order.price}</div>
            </div>
        `
    })

    return ordersHtml
}

function getOrderTotal() {
    const initVal = 0
    const orderTotal = priceArray.reduce((acc, curVal) => acc + curVal, initVal)
    return orderTotal
}

function renderOrder() {

    if (orderArray.length > 0) {
        checkout.classList.remove("hidden")
    }

    let orderSectionHtml = `
        <section id="checkout">
            <h2 class="checkout-h2">Your order</h2>
            ${getOrdersHtml()}
            <div class="order-total">
                <div>Total price:</div> <div class="item-price">$${getOrderTotal()}</div>
            </div>
            <button type="submit" class="order-btn" id="order-btn">Complete order</button>
        </section>
    `
    
    return orderSectionHtml
}

function displayPaymentModal() {
    paymentModal.classList.remove("hidden")
    overlay.classList.remove("hidden")

    paymentForm.addEventListener("submit", function(e) {
        e.preventDefault()
        const name = new FormData(paymentForm)
        const nameFromForm = name.get("cardName")
        paymentModal.classList.add("hidden")
        checkout.classList.add("hidden")
        thanksMsg.classList.remove("hidden")
        thanksMsg.innerHTML = `<div id="thanks">Thanks ${nameFromForm}! Your order is on the way</div>`
    })
}

function render() {
    menu.innerHTML = renderMenu()
    checkout.innerHTML = renderOrder()
}

render()
