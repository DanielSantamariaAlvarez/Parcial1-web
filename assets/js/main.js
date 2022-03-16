const DATA = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
const burgers = document.getElementById('burger')
const tacos = document.getElementById('tacos')
const salads = document.getElementById('salads')
const desserts = document.getElementById('desserts')
const drinks = document.getElementById('drinks')
let datos 
let content = document.getElementById('productos')
let itemsCart = document.getElementById('itemsCart')
let desaparecer = document.getElementById('carrito')
let alerta = document.getElementById('alert')
let countCar = document.getElementById('cuenta')

let titulo = document.getElementById('nombreProducto')
let tituloR = document.getElementById('tituloProducto')
let botones = document.getElementsByClassName("btn-warning")
let sumitas = document.getElementsByClassName("suma")
let restitas = document.getElementsByClassName("resta")
let car = 0
let items = {}

// obtener datos de la api
fetch(DATA)
    .then(response =>response.json())
    .then(response => {
       datos = response
       loadBurgers()
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
            tituloR.innerHTML = element.name
            content.innerHTML = ``
            itemsCart.innerHTML = ``
            desaparecer.classList.remove('d-flex')
            desaparecer.className += " d-none"
            for (let index = 0; index < element.products.length; index++) {
                const products = element.products[index];
                content.innerHTML += `
                <div class="col-md-3">
                <div class ="tarjeta">
                <div class="img"><img src="${products.image}" class="w-100 h-100"></div>
                <h2 class="text-center p-2">${products.name}</h2>
                <p class="descripcion">${products.description}</p>
                <p class="precio">${products.price}</p>
                
                <button  data-id="${products.name}" type="button" class="btn btn-warning">Add to cart</button>
                </div>
                </div>
                `

            }
            
        }
    });
    taran()
}

let loadTable = () =>{
    titulo.innerHTML = "Order Detail"
    content.innerHTML = ``
    itemsCart.innerHTML = ``
    desaparecer.classList.remove('d-none')
    desaparecer.className += " d-flex"
    contador = 1
    cuenta = 0
    Object.values(items).forEach(producto => {
        itemsCart.innerHTML += `
        <tr >
        <th class="ocultar" scope="row">${contador}</th>
        <td>${producto.cantidad}</td>
        <td class="nombreP">${producto.title}</td>
        <td class="precio ocultar">${producto.precio}</td>
        <td class="ocultar" >${producto.precio * producto.cantidad}</td>
        <td>
            <button data-id="${producto.title}" class="btn btn-warning btn-md text-light suma" >
                +
            </button>

            <button data-id="${producto.title}" class="btn btn-warning btn-md text-light resta">
                --
            </button>
        </td>
        </tr>
        `
        contador++
        cuenta += producto.precio * producto.cantidad
    })
    let total = document.getElementById('total')
    total.innerHTML=`
        Total: $ <span id="total">${Math.round(cuenta * 100)/100}</span>
    `
    taran2()
}

let taran = () =>{
    for (var i = 0 ; i < botones.length; i++) {
        botones[i].addEventListener('click', e =>{
            addCarrito(e)
        })
     }
}

let taran2 = () =>{
    for (var i = 0 ; i < sumitas.length; i++) {
        sumitas[i].addEventListener('click', e =>{
            addCarrito2(e)
        })
     }
     for (var i = 0 ; i < restitas.length; i++) {
        restitas[i].addEventListener('click', e =>{
            dropCarrito(e)
        })
     }
}

let addCarrito = (e) =>{
    sumar()
    setCarrito(e.target.parentElement)
    e.stopPropagation()
}
let addCarrito2 = (e) =>{
    sumar()
    setCarrito2(e.target.parentElement.parentElement)
    loadTable()
    e.stopPropagation()
}
let dropCarrito = (e) =>{
    restar()
    setDropCarrito(e.target.parentElement.parentElement)
    e.stopPropagation()
}
let setCarrito = (obj) =>{
    const producto = {
        cantidad: 1,
        title: obj.querySelector('h2').textContent,
        precio: obj.querySelector('.precio').textContent
    }
    if(items.hasOwnProperty(producto.title)){
        producto.cantidad = items[producto.title].cantidad + 1
    }
    
    items[producto.title] = {...producto}
}
let setCarrito2 = (obj) =>{
    const producto = {
        cantidad: 1,
        title: obj.querySelector('.nombreP').textContent,
        precio: obj.querySelector('.precio').textContent
    }
    if(items.hasOwnProperty(producto.title)){
        producto.cantidad = items[producto.title].cantidad + 1
    }
    
    items[producto.title] = {...producto}
}
let setDropCarrito = (obj) => {
    nP = obj.querySelector('.nombreP').textContent
    const producto = {
        cantidad: -1,
        title: nP,
        precio: obj.querySelector('.precio').textContent
    }
    producto.cantidad = items[nP].cantidad - 1
    let valor = 0
    valor = items[nP].cantidad - 1
    if(valor == 0){
        delete items[nP]}
    else{items[nP] = {...producto}}
    
    loadTable()
    
}

let sumar = () => {
    car++
    countCar.innerHTML = car + " Items"
}

let restar = () => {
    car--
    (car == 0)
    ? countCar.innerHTML = ""
    :countCar.innerHTML = car + " Items"
}

let cancelar = () => {
    items = {}
    itemsCart.innerHTML = ``
    loadTable()
    car = 0
    countCar.innerHTML = ""
    descancelar()
}

let confirmar = () =>{
    retorno = []
    contador = 1
    Object.values(items).forEach(r => {
        r.item = contador
        retorno.push(r)
        contador ++
    })
    console.log(retorno)

}

let preCancel = () => {
    alerta.classList.remove('d-none')
    alerta.className += ' d-block'
}
let descancelar = () => {
    alerta.classList.remove('d-block')
    alerta.className += ' d-none'
}

