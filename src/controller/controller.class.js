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
            this.myView.renderProducts(newProd)
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

    putPredeterminatedProducts() {
        for (const product of this.myStore.products) {
            this.myView.renderProducts(product)
        }
    }

    putPredeterminatedCategories() {
        for (const category of this.myStore.categories) {
            this.myView.renderCategories(category)
        }
    }
}

module.exports = Controller