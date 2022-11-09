class View {
    init() { }

    renderProducts(prod, callback) {
        const productUI = document.createElement('tr')
        const importProd = prod.productImport() //.toFixed(2)
        productUI.id = "prod" + prod.id
        productUI.innerHTML = `
            <td>${prod.id}</td> 
            <td class="name-prod">${prod.name}</td> 
            <td class="cat-prod">${prod.category}</td>
            <td class="units-prod">${prod.units}</td>
            <td class="price-prod">${prod.price} €/u</td>
            <td class="import-prod">${importProd}
            <td>
            <button class="sum-unit-prod">
            <span class="material-icons">arrow_drop_up</span>
            </button>
            <button class="rest-unit-prod">
            <span class="material-icons">arrow_drop_down</span>
            </button>
            <button class="edit-prod">
            <span class="material-icons">edit</span>
            </button>
            <button class="del-prod">
            <span class="material-icons">delete</span>
            </button>
            </td>`
        const tbodyUI = document.querySelector('#almacen-productos tbody')
        tbodyUI.appendChild(productUI)

        productUI.querySelector('.sum-unit-prod').addEventListener('click', () => {
            callback.sumUnits(prod.id)
        })

        productUI.querySelector('.rest-unit-prod').addEventListener('click', () => {
            callback.restUnits(prod.id)
        })

        productUI.querySelector('.del-prod').addEventListener('click', () => {
            callback.deleteProductFromStore(prod.id)
        })

        productUI.querySelector('.edit-prod').addEventListener('click', () => {
            document.getElementById("add-producto").classList.remove("hiddenPart")
            document.getElementById("lista-productos").classList.add("hiddenPart")
            document.getElementById('newprod-id').value = prod.id
            document.getElementById('newprod-name').value = prod.name
            document.getElementById('newprod-cat').value = prod.category
            document.getElementById('newprod-units').value = prod.units
            document.getElementById('newprod-price').value = prod.price
            document.getElementById('submit-prod').innerHTML = 'Cambiar'
        })
    }

    renderTotalImport(myStore) {
        const totalUI = document.getElementById('total')
        totalUI.textContent = `${myStore.totalImport().toFixed(2)} €`
    }

    showMessage(error, message) {
        const messageUI = document.getElementById('messages')
        const newMessageUI = document.createElement('div')
        newMessageUI.className = "alert alert-danger alert-dismissible"
        newMessageUI.innerHTML = `${message}: ${error} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>`
        messageUI.appendChild(newMessageUI)
    }

    renderCatList(category, callback) {
        const categoryUI = document.createElement('tr')
        categoryUI.id = "cat" + category.id
        categoryUI.innerHTML = `
            <td>${category.id}</td> 
            <td class="name-cat">${category.name}</td> 
            <td class="description-cat">${category.description}</td>
            <td>
            <button class="edit-cat">
            <span class="material-icons">edit</span>
            </button>
            <button class="del-cat">
            <span class="material-icons">delete</span>
            </button>
            </td>`
        const tbodyUI = document.querySelector('#almacen-categorias tbody')
        tbodyUI.appendChild(categoryUI)

        categoryUI.querySelector('.del-cat').addEventListener('click', () => {
            callback.deleteCategoryFromStore(category.id)
        })

        categoryUI.querySelector('.edit-cat').addEventListener('click', () => {
            document.getElementById("add-categoria").classList.remove("hiddenPart")
            document.getElementById("lista-categorias").classList.add("hiddenPart")
            document.getElementById('newcat-id').value = category.id
            document.getElementById('newcat-name').value = category.name
            document.getElementById('newcat-description').value = category.description
            document.getElementById('submit-cat').innerHTML = 'Cambiar'
        })
    }

    renderCategories(category, callback) {
        this.renderCatList(category, callback)

        const categoryUI = document.getElementById('newprod-cat')
        const newOption = document.createElement('option')
        newOption.id = "cat" + category.id
        newOption.value = category.id
        newOption.innerHTML = category.name
        categoryUI.appendChild(newOption)
    }

    renderDelProduct(prod) {
        const productUI = document.getElementById("prod" + prod.id)
        productUI.remove()
    }

    renderDelCategory(cat) {
        const categoryUI = document.getElementById("cat" + cat.id)
        categoryUI.remove()
    }

    renderEditProduct(prod) {
        const productUI = document.getElementById("prod" + prod.id)
        productUI.querySelector('.name-prod').innerHTML = prod.name
        productUI.querySelector('.cat-prod').innerHTML = prod.category
        productUI.querySelector('.price-prod').innerHTML = prod.price + " €/u"
        productUI.querySelector('.units-prod').innerHTML = prod.units
        productUI.querySelector('.import-prod').innerHTML = prod.productImport().toFixed(2) + " €"
    }

    renderEditCategory(cat) {
        const categorytUI = document.getElementById("cat" + cat.id)
        categorytUI.querySelector('.name-cat').innerHTML = cat.name
        categorytUI.querySelector('.description-cat').innerHTML = cat.description
    }

    renderListProduct() {
        document.querySelector("h1").textContent = 'Lista de productos'
        this.ocultAll()
        document.getElementById("lista-productos").classList.remove("hiddenPart")
    }

    renderListCategory() {
        document.querySelector("h1").textContent = 'Lista de categorias'
        this.ocultAll()
        document.getElementById("lista-categorias").classList.remove("hiddenPart")
    }

    renderAddProduct() {
        document.querySelector("h1").textContent = 'Añadir nuevo producto'
        this.ocultAll()
        document.getElementById("add-producto").classList.remove("hiddenPart")
    }

    renderAddCategory() {
        document.querySelector("h1").textContent = 'Añadir nueva categoria'
        this.ocultAll()
        document.getElementById("add-categoria").classList.remove("hiddenPart")
    }

    renderAboutUs() {
        document.querySelector("h1").textContent = 'Sobre nosotros'
        this.ocultAll()
        document.getElementById("about-us").classList.remove("hiddenPart")
    }

    ocultAll() {
        document.getElementById("about-us").classList.add("hiddenPart")
        document.getElementById("add-categoria").classList.add("hiddenPart")
        document.getElementById("add-producto").classList.add("hiddenPart")
        document.getElementById("lista-productos").classList.add("hiddenPart")
        document.getElementById("lista-categorias").classList.add("hiddenPart")
    }
}

module.exports = View