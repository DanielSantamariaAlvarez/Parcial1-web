const DATA = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
const burgers = document.getElementById('burger')
const tacos = document.getElementById('tacos')
const salads = document.getElementById('salads')
const desserts = document.getElementById('desserts')
const drinks = document.getElementById('drinks')
let datos 
let content = document.getElementById('productos')
let titulo = document.getElementById('nombreProducto')
let car = 0

// obtener datos de la api
fetch(DATA)
    .then(response =>response.json())
    .then(response => {
       datos = response
       loadBurgers()
       document.getElementById("compro").innerHTML = "Carro " + car
    });

let loadBurgers = () => {
    loadProduct("Burguers")
}
let loadTacos = () => {
    loadProduct("Tacos")
}
let loadSalads = () => {
    loadProduct("Salads")
}
let loadDesserts = () => {
    loadProduct("Desserts")
}
let loadDrinks = () => {
    loadProduct("Drinks and Sides")
}


let loadProduct = (i) =>{
    datos.forEach(element => {
        if(element.name == i){
            titulo.innerText = element.name
            content.innerHTML = ``
            for (let index = 0; index < element.products.length; index++) {
                const products = element.products[index];
                content.innerHTML += `
                <div class="col-md-3">
                <h2>${products.name}</h2>
                <p>${products.description}</p>
                <p>${products.price}</p>
                <img src="${products.image}" class="w-100">
                <button onclick="sumar()" type="button" class="btn btn-success">Comprar</button>
                </div>
                `
                console.log(car)
            }
        }
    });
}

let sumar = () => {
    countCar = document.getElementById('compro')
    car++
    countCar.innerHTML = "Carro " + car
}








