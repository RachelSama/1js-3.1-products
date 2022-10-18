const category = require('../model/category.class')
const Store = require('../model/store.class')
const View = require('../view/view.class')

class Controller {
    constructor() {
        this.myStore = new Store(1, 'Almacén ACME')
        this.myView = new View()
    }

    init() {
        this.myStore.loadData()
        this.myView.init()
        this.putPredeterminatedCategories()
        this.putPredeterminatedProducts()
        this.myView.renderTotalImport(this.myStore)
    }

    addProductToStore(payload) {
        try {
            const newProd = this.myStore.addProduct(payload)
            this.myView.renderProducts(newProd, this.deleteProductFromStore.bind(this))
            this.myView.renderTotalImport(this.myStore)
        } catch(error) {
            this.myView.showMessage(error, 'Error al añadir el producto')
        }
    }

    addCategoryToStore(payload) {
        try {
            const newCategory = this.myStore.addCategory(payload.name, payload.description)
            this.myView.renderCategories(newCategory)
        } catch(error) {
            this.myView.showMessage(error, 'Error al añadir la categoria')
        }
    }

    deleteProductFromStore(id) {
        try {
            const prodDeleted = this.myStore.delProduct(id)
            this.myView.renderDelProduct(prodDeleted)
        } catch(error) {
            this.myView.showMessage(error, 'Error al eliminar el producto')
        }
    }

    deleteCategoryFromStore(id) {
        try {
            const catDeleted = this.myStore.delCategory(id)
            this.myView.renderDelCategory(catDeleted)
        } catch(error) {
            this.myView.showMessage(error, 'Error al eliminar la categoria')
        }
    }

    editProductFromStore(payload) {
        try {
            const prod = this.myStore.editProduct(payload)
            this.myView.renderEditProduct(prod)
            this.myView.renderTotalImport(this.myStore)
        } catch(error) {
            this.myView.showMessage(error, 'Error al editar el producto')
        }
    }

    editCategoryFromStore(payload) {
        try {
            const cat = this.myStore.editCategory(payload)
            this.myView.renderEditCategory(cat)
        } catch(error) {
            this.myView.showMessage(error, 'Error al editar la categoria')
        }
    }

    sumUnits(id) {
        try {
            const prod = this.myStore.sumUnitsToProduct(id)
            this.myView.renderEditProduct(prod)
            this.myView.renderTotalImport(this.myStore)
        } catch(error) {
            this.myView.showMessage(error, 'Error al sumar unidades al producto')
        }
    }

    restUnits(id) {
        try {
            const prod = this.myStore.restUnitsToProduct(id)
            this.myView.renderEditProduct(prod)
            this.myView.renderTotalImport(this.myStore)
        } catch(error) {
            this.myView.showMessage(error, 'Error al restar unidades al producto')
        }
    }

    showListProduct() {
        this.myView.renderListProduct()
    }

    showListCategories() {
        this.myView.renderListCategory()
    }

    showAddProduct() {
        this.myView.renderAddProduct()
    }

    showAddCategory() {
        this.myView.renderAddCategory()
    }

    showAboutUs() {
        this.myView.renderAboutUs()
    }

    putPredeterminatedProducts() {
        this.myStore.products.forEach((product) => this.myView.renderProducts(product, this))
    }

    putPredeterminatedCategories() {
        this.myStore.categories.forEach((category) => this.myView.renderCategories(category, this))
    }
}

module.exports = Controller