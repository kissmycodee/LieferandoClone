let list = ['Burger Mexican', 'Pizza Italy', 'Noodle Asia', 'Salad']
let ingredients = ['scharfe Soße', 'Chicken Barbecue', 'asiatischer Art', ' griechischer Bauernsalat']
let prices = [4.95, 5.95, 6.95, 3.95]

let basketList = []
let basketPrice = []
let amounts = []



// onload render
function renderMeals() {
  let meals = document.getElementById('meals')
  meals.innerHTML = ``
  for (let i = 0; i < list.length; i++) {
    const meal = list[i];
    const ingredient = ingredients[i]
    const price = prices[i]

    meals.innerHTML += createMeals(meal, ingredient, price, i)
  }
}




// Hilfsfunktion für return Meals - auslagern
function createMeals(meal, ingredient, price, i) {
  return `
    <div class="meal-box">
      <div>
         <h3>${meal}</h3>
         <div class="ingredient">
          <span>${ingredient}</span>
         </div> 
        <div class="price">
          <span>${price.toFixed(2)} €</span>
        </div>     
      </div>
      <i class="fa-solid fa-plus" onclick="add(${i})"></i>
    </div>
  `
}



function add(i) {
  if (basketList.includes(list[i])) { // or if index == -1
    let index = basketList.indexOf(list[i])
    amounts[index]++
  }else {
    basketList.push(list[i])
    basketPrice.push(prices[i])
    amounts.push(1)
  }
  renderBasket()
}




function renderBasket() {
  let empty = document.getElementById('showEmpty')
  let hide = document.getElementById('hideEmpty')

  hide.innerHTML = ''
  for (let i = 0; i < basketList.length; i++) {
    hide.innerHTML += addMeal(i)
  }
  if (basketList.length < 1) {
    empty.classList.remove('d-none')
  } else {
    empty.classList.add('d-none')
    hide.innerHTML += showResult()
    calc()
  }
}




//  one Meal per Click
function addMeal(i) {
    const meal = list[i]
    const price = prices[i]
    const amount = amounts[i]

    return `
        <div class="added" id="added">
          <span>${amount}</span>
          <span>${meal}</span>
          <span id="addedPrice">${(price * amount).toFixed(2)}€</span>
          <div class="add-delete-icon">
              <i class="fa-solid fa-minus"onclick="deleteOne(${i})"></i>
              <i class="fa-solid fa-plus"onclick="addOne(${i})"></i>
          </div>
        </div>
    `
}



function addOne(i) {
    amounts[i]++
    renderBasket()
}




function deleteOne(i) {
  if (amounts[i] <= 1) {
    basketList.splice(i, 1)
    basketPrice.splice(i, 1)
  } else {
    amounts[i]--
  }
  renderBasket()
}



function calc() {
    let sum = 0
    subresult = document.getElementById('subresult')
    totalresult = document.getElementById('totalresult')

    for (let i = 0; i < basketPrice.length; i++) {
      sum += basketPrice[i] * amounts[i];
    }
    subresult.innerHTML = `${(sum).toFixed(2)}€`
    totalresult.innerHTML = `${(sum).toFixed(2)}€`
}



function showResult() {
  return `
  <div class="result" id="result">
    <div class="result-left">
      <span>Zwischensumme</span>
      <span>Gesamt</span>
    </div>
    <div class="result-right">
      <span id="subresult"></span>
      <span id="totalresult"></span>
    </div>
</div>
  `
}

