'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  document.getElementById('link-prod').addEventListener('click', () => {
    myController.showListProduct()
  })

  document.getElementById('link-cat').addEventListener('click', () => {
    myController.showListCategories()
  })

  document.getElementById('link-addprod').addEventListener('click', () => {
    myController.showAddProduct()
  })

  document.getElementById('link-addcat').addEventListener('click', () => {
    myController.showAddCategory()
  })

  document.getElementById('link-about').addEventListener('click', () => {
    myController.showAboutUs()
  })

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()


    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value 
    const category = document.getElementById('newprod-cat').value
    const units = document.getElementById('newprod-units').value
    // ...
    const id = document.getElementById('newprod-id').value

    if(id) {
      myController.editProductFromStore({id, name, price, category, units})
      document.getElementById("add-producto").classList.add("hiddenPart")
      document.getElementById("lista-productos").classList.remove("hiddenPart")
      document.getElementById('submit-prod').innerHTML = 'Añadir'
      
    } else {
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
      myController.addProductToStore({ name, price, category, units})   
    }
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newcat-name').value 
    const description = document.getElementById('newcat-description').value

    const id = document.getElementById('newcat-id').value

    if(id) {
      myController.editCategoryFromStore({id, name, description})
      document.getElementById("add-categoria").classList.add("hiddenPart")
      document.getElementById("lista-categorias").classList.remove("hiddenPart")
      document.getElementById('submit-cat').innerHTML = 'Añadir'
      
    } else {
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addCategoryToStore({ name, description})    
    }
    
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
      
  })

  // document.getElementById('del-cat').addEventListener('submit', (event) => {
  //   event.preventDefault()

  //   myController.deleteCategoryFromStore(document.getElementById('delcat-id').value)      
  // })

})
