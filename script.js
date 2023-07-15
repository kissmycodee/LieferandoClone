let foodname = [`Crispy Chicken`, `Blue Cheese`, `Chefs`, `Chili Cheesy`, `Black Angus`, `Surf N Turf`, `Veggi Burger`, `Grüner Salat`, `Gemischter Salat`, `Cesar`, `Coca-Cola 0.45l `, `Fuse Tea Peach 0.5l`, `Rivella Rot 0.5l`]
let foodinfo = [`Hauspaniertes Pouletschnitzel im Cornflakesmantel Salat, Cheddar, Bacon, Essiggurken, rote Zwiebeln, Tomaten mit Tartar & Cocktailsauce`, `Hausgemachtes Beef Patty, Rucola, Roquefort, Feigen-Senf Chutney, Tomaten, Röstzwiebel mit Mascarpone & Mayo und Gorgonzola-Sauce`, `Hausgemachte Beef Patty, Rucola, Grana Padano, Bacon, Getrocknete Tomaten, rote Zwiebeln mit Mascarpone-Mayo & Pesto-Basilikum`, `Hausgemachtes Beef Patty, Cheddar Chili Cheddar, Black Pepper Cheddar, Bacon, Tomaten, rote Zwiebeln mit Spicy Cocktailsauce`, `Black Angus Beef Patty, Cole Slaw, Cheddar Bacon, Tomaten, rote Zwiebeln mit Steakbarbecue`, `Hausgemachtes Beef Patty, Rucola, Cheddar, Gambas Tomaten, rote Zwiebeln mit Pesto & Cocktailsauce`, `Zubereitet mit Patty, Bun, Zutaten und Saucen Deiner Wahl`, `Serviert mit Parmesansplitter an French Dressing`, `Serviert mit Parmesansplitter an French Dressing`, `Serviert mit Eisbergsalat und Parmesansplitter an Ceasar Dressing`, `Enthält Koffein , 2,89 €/l, 450ml`, `2,00 €/l, 500ml`, `2,00 €/l, 500ml`]
let foodprice = [4.90, 5.80, 2, 2, 2.90, 2, 1.50, 9.50, 1, 1, 4, 4, 3.5, ]

let basketList = []
let basketPrice = []
let amounts = []

let minimumOrder = 30

// onload render
function renderMeals() {
  let contentMenu1 = document.getElementById(`input-menu1`)
  contentMenu1.innerHTML = ``
  for (let i = 0; i < foodname.length; i++) {
    contentMenu1.innerHTML += `
    <div class="card">
       <div class="cardX"><button onclick="addOrder(${i})"> <span id="stand${i}">+</span></button></div><!--i (index)-->
<h4>${foodname[i]}</h4>
<p>${foodinfo[i]}</p>
<h5>${foodprice[i].toFixed(2).replace('.', ',')} € </h5>
    </div>
    `
  }
  footer()
  loadBasket();
  renderOrderEmpty();
  checkOrder();
 
}


function footer() {
  //footer HTML Code
  let footer = document.getElementById(`footer-id`);
  footer.innerHTML = ``;
  footer.innerHTML = `
  <div class="footer-container">
      <div class="footer-links">
          <a href="#"target="_blank"> Impressum</a>
          <a href="#" target="_blank" >Datenschutzerklärung</a>
      </div>
      <div class="icons-a" >
      <a href="https://www.flaticon.com/">Icon from Flaticon</a>
      <a href="https://de.freepik.com/">Picture from Freepik</a>
</div>
    <div class="pfeil">
      <a href="#main-icon"><img src="img/pfeil-nach-oben.png"><a/>
      <p> © 2023 Liefer-Food</p>
    </div>
  </div>
  `;
}


window.onscroll = function() {
  scrollBasket();
  scrollNav();
  scrollBasketEnd();
}


function scrollBasket() {
  // Funktion Menu beim Scrollen ganz nach oben schieben (position fixed / beginn top 100px )
  if (window.scrollY > 50) {
      document.getElementById(`warenkorb-position`).style.top = `0px`;
  } else {
      document.getElementById(`warenkorb-position`).style.top = `100px`;
  }
}

function scrollBasketEnd() {
  // Funktion Menu beim Scrollen ganz nach oben schieben (position fixed / beginn top 100px )
  if (window.scrollY > 2050) {
      document.getElementById(`warenkorb-position`).classList.add(`warenkorb1`);
  } else {
      document.getElementById(`warenkorb-position`).classList.remove(`warenkorb1`);
  }
}


function scrollNav() {
  // Funktion Nav beim Scrollen ganz nach oben schieben (psotion Relativ zu Postion Fixed )
  if (window.scrollY > 528) {
      document.getElementById(`nav`).classList.add(`nav1`);
  } else {
      document.getElementById(`nav`).classList.remove(`nav1`);
  }
}

function checkOrder() {
  //überprüfe Warenkorb 
  //wenn nix drin ist, lass das Bild und den text anzeigen
  if (basketList.length > 0) {
      addBasket();
  } else {
      renderOrderEmpty();
  }
}




function renderOrderEmpty() {
  document.getElementById('basket-container').innerHTML = `
  <div id="basket" class="basket-full">
  <img src="img/shopping-basket.png">
      <h4>Fülle deinen Warenkorb</h4>
      <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
  </div>`;
}

function addOrder(i) {
  //Array Foodname in basket_food zu setzen
  // basket_food und basket_price können nur einmal in das Array gefügt werden
  // basket_amounts kann sich vermehren / sprich beggint bei 1 und geht dann hoch (ist die bestell menge)
  let include = foodname[i];
  let editPlus = document.getElementById(`stand${i}`);
  if (basketList.includes(include)) {
      let position = basketList.indexOf(include);
      amounts[position]++;
      editPlus.innerHTML = amounts[position];
  } else {
      basketList.push(foodname[i]);
      basketPrice.push(foodprice[i]);
      amounts.push(1);
      editPlus.innerHTML = 1;
  }
  checkOrder();
  saveBasket();
}


function addBasket() {
  //Zum warenkorb hinzufügen 
  //Button Plus / Minus 
  let sum = 0
  let conten_basket = document.getElementById(`basket`);
  conten_basket.innerHTML = ``;
  for (let j = 0; j < basketList.length; j++) {
      sum = basketPrice[j] * amounts[j];
      conten_basket.innerHTML += /*html*/ `
      <div class="test" >
<div class="basket-info" >
<h5>${amounts[j]}</h5>
<h5>${basketList[j]}</h5>
<p>${sum.toFixed(2).replace('.', ',')}€</p>
</div>
<div class=basket-btn >
<img id="mm" onclick="minus(${j})" src="img/minus-sign.png">
<img id="nn"  onclick="plus(${j})" src="img/plus.png">
</div>
<hr>
  </div>
`;
  }
  additing();
  warenkorbEinblenden();

}



function plus(i) {
  //Ware im bestehen Korb erhöhen plus taste 
  amounts[i]++;
  checkOrder();
  additing();
  warenkorbEinblenden();
}


function minus(i) {
  let editPlus = document.getElementById(`stand${i}`);
  //Ware reduzieren im Warenkorb Minus Taste
  if (amounts[i] <= 1) {
      basketList.splice(i, 1)
      basketPrice.splice(i, 1)
      amounts.splice(i, 1)
      checkOrder();
      additing();
  } else {
      amounts[i]--;
      editPlus.innerHTML = amounts[i];

  }
  warenkorbAusblenden();
  checkOrder();
  saveBasket();
}



function additing() {
  let sum = 0
  let sum1 = 0
  let versand = 0
  for (let i = 0; i < basketPrice.length; i++) {
      sum1 += basketPrice[i] * amounts[i];
      sum += basketPrice[i] * amounts[i];
  }
  if (sum > 40) {
      versand = 0

  } else {
      versand = 5
  }
  let sum2 = sum + versand;
  document.getElementById(`payment`).innerHTML = /*html*/ generatePaymentHtml(sum1, versand, sum2);
  let bestellen = document.getElementById(`bestellen`);
  let sum3 = 30 - sum2
  warenkorbEinblenden();
  if (sum < 30) {

      bestellen.disabled = true;
      bestellen.innerHTML = `Noch offen ` + `<br>` + sum3.toFixed(2).replace('.', ',') + ` €`;
  } else if (sum > 30) {
      bestellen.disabled = false;
      bestellen.innerHTML = `Bestellung aufgeben`
  }
}


function generatePaymentHtml(sum1, versand, sum2) {
  return `
  <div id=summe class="d-none">
  <div class="subtotal ">
  <div>Zwischensumme</div>
  <div>${sum1.toFixed(2).replace('.', ',')} € inkl. MwSt.</div>
</div>   
<br>
<div class="deliver">
  <div>Lieferkosten</div>
  <div>${versand} € </div>
</div> 
<br>
<div class="total">
  <div><b>Gesamtsumme</b></div> 
  <div>${sum2.toFixed(2).replace('.', ',')} € inkl. MwSt.</div>
</div>
<!--Button Bestellen-->
<div><button   disabled  type="button" id="bestellen" ></button> </div>
</div>`;
}





function warenkorbEinblenden() {
  document.getElementById(`summe`).classList.remove(`d-none`);
}


function warenkorbAusblenden() {
  document.getElementById(`summe`).classList.add(`d-none`);
}


function saveBasket() {
  let basket_amountAsText = JSON.stringify(amounts);
  let basket_foodAsText = JSON.stringify(basketList);
  let basket_pricesAsText = JSON.stringify(basketPrice);

  localStorage.setItem('amounts', basket_amountAsText);
  localStorage.setItem('basketList', basket_foodAsText);
  localStorage.setItem('basketPrice', basket_pricesAsText);
}


function loadBasket() {

  let basket_amountAsText = localStorage.getItem('amounts');
  if (basket_amountAsText) { amounts = JSON.parse(basket_amountAsText); }

  let basket_foodAsText = localStorage.getItem('basketFood');
  if (basket_foodAsText) { basketList = JSON.parse(basket_foodAsText); }

  let basket_pricesAsText = localStorage.getItem('basketPrice');
  if (basket_pricesAsText) { basketPrice = JSON.parse(basket_pricesAsText); }

}

function back() {
  render();


}


function einMiniBaskekt() {
  document.getElementById(`warenkorb-position`).classList.remove(`d-nn`);
  document.getElementById(`body`).classList.add(`bodyFixed`);

}


function ausMiniBaskekt() {
  document.getElementById(`warenkorb-position`).classList.add(`d-nn`);
  document.getElementById(`body`).classList.remove(`bodyFixed`);
  renderMeals();
}