class View {
    init() {}

    renderProducts(prod) {
        const productUI = document.createElement('tr')
        productUI.id = "prod"+prod.id
        productUI.innerHTML = `
            <td>${prod.id}</td> 
            <td>${prod.name}</td> 
            <td>${prod.category}</td>
            <td>${prod.units}</td>
            <td>${prod.price} €/u</td>
            <td>${prod.productImport()} €</td>
            <td></td>`
        const tbodyUI = document.querySelector('#almacen tbody')
        tbodyUI.appendChild(productUI)
    }

    renderTotalImport(myStore) {
        const tfootUI = document.querySelector('#almacen tfoot')
        const totalUI = document.getElementById('total')
        const newTotalUI = document.createElement('th')
        newTotalUI.id = "total"
        totalUI.innerHTML = `${myStore.totalImport()} €`
        tfootUI.replaceChildren(newTotalUI, totalUI)
    }

    showMessage(error, message) {
        const messageUI = document.getElementById('messages')
        const newMessageUI = document.createElement('div')
        newMessageUI.className = "alert alert-danger alert-dismissible"
        newMessageUI.innerHTML = `${message}: ${error} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>`
        messageUI.appendChild(newMessageUI)
        }

    renderCategories(category) {
        const categoryUI = document.getElementById('newprod-cat')
        const newOption = document.createElement('option')
        newOption.id = "cat"+category.id
        newOption.value = category.id
        newOption.innerHTML = category.name
        categoryUI.appendChild(newOption)
    }

    renderDelProduct(prod) {
        const productUI = document.getElementById("prod"+prod.id)
        productUI.remove()
    }

    renderDelCategory(cat) {
        const categoryUI = document.getElementById("cat"+cat.id)
        categoryUI.remove()
    }
}

module.exports = View