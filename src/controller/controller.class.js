const Store = require('../model/store.class')
const View = require('../view/view.class')

class Controller {
    constructor() {
        this.myStore = new Store(1, 'Almacén ACME')
        this.myView = new View()
    }

    async init() {
        try {
            await this.myStore.loadData()
        } catch (err) {
            this.myView.showMessage(err + 'Error al cargar la informacion del servidor')
        }
        this.myStore.categories.forEach((categoria) => {
            this.myView.renderCategories(categoria, this)
        })
        this.myStore.products.forEach((producto) => {
            this.myView.renderProducts(producto, this)
            this.myView.renderTotalImport(this.myStore)
        })

        this.setListeners()
    }

    setListeners() {
        const inputName = document.getElementById('newprod-name')
        inputName.addEventListener('blur', () => {
            if (this.myStore.productNameExist(inputName.value, inputName.id)) {
                inputName.setCustomValidity('El producto ya existe')
            } else {
                inputName.setCustomValidity('')
            }
            inputName.nextElementSibling.textContent = inputName.validationMessage
        })

        const inputCat = document.getElementById('newprod-cat')
        inputCat.addEventListener('blur', () => {
            inputCat.nextElementSibling.textContent = inputCat.validationMessage
        })

        const inputUnits = document.getElementById('newprod-units')
        inputUnits.addEventListener('blur', () => {
            inputUnits.nextElementSibling.textContent = inputUnits.validationMessage
        })

        const inputPrice = document.getElementById('newprod-price')
        inputPrice.addEventListener('blur', () => {
            inputPrice.nextElementSibling.textContent = inputPrice.validationMessage
        })

        document.addEventListener('submit', () => {
            inputName.nextElementSibling.textContent = inputName.validationMessage
            inputCat.nextElementSibling.textContent = inputCat.validationMessage
            inputUnits.nextElementSibling.textContent = inputUnits.validationMessage
            inputPrice.nextElementSibling.textContent = inputPrice.validationMessage
        });
    }

    addProductToStore(payload) {
        try {
            if (document.getElementById('new-prod').checkValidity()) {

                this.myStore.addProduct(payload)
                    .then((newProd) => {
                        this.myView.renderProducts(newProd, this)
                    })
                    .catch((error) => this.myView.showMessage(error))

                this.myView.renderTotalImport(this.myStore)
            }
        } catch (error) {
            this.myView.showMessage(error, 'Error al añadir el producto')
        }
    }


    editProductFromStore(payload) {
        try {
            this.myStore.editProduct(payload)
                .then((editProd) => {
                    this.myView.renderEditProduct(editProd)
                })
                .catch((error) => this.myView.showMessage(error))

            this.myView.renderTotalImport(this.myStore)
        } catch (error) {
            this.myView.showMessage(error, 'Error al editar el producto')
        }
    }

    sumUnits(id) {
        try {
            this.myStore.sumUnitsToProduct(id)
                .then((prod) => {
                    this.myView.renderEditProduct(prod)
                })
                .catch((error) => this.myView.showMessage(error))
            this.myView.renderTotalImport(this.myStore)
        } catch (error) {
            this.myView.showMessage(error, 'Error al sumar unidades al producto')
        }
    }

    restUnits(id) {
        try {
            this.myStore.restUnitsToProduct(id)
                .then((prod) => this.myView.renderEditProduct(prod))
                .catch((error) => this.myView.showMessage(error))
            this.myView.renderTotalImport(this.myStore)
        } catch (error) {
            this.myView.showMessage(error, 'Error al restar unidades al producto')
        }
    }



    deleteProductFromStore(id) {
        try {
            this.myStore.delProduct(id)
                .then((prodDeleted) => {
                    this.myView.renderDelProduct(prodDeleted)
                })
                .catch((error) => this.myView.showMessage(error))
        } catch (error) {
            this.myView.showMessage(error, 'Error al eliminar la categoria')
        }
    }

    addCategoryToStore(payload) {
        try {
            this.myStore.addCategory(payload)
                .then((newCategory) => {
                    this.myView.renderCategories(newCategory)
                })
                .catch((error) => this.myView.showMessage(error))
        } catch (error) {
            this.myView.showMessage(error, 'Error al añadir la categoria')
        }
    }

    editCategoryFromStore(payload) {
        try {
            this.myStore.editCategory(payload)
                .then((cat) => {
                    this.myView.renderEditCategory(cat)
                })
                .catch((error) => this.myView.showMessage(error))
        } catch (error) {
            this.myView.showMessage(error, 'Error al editar la categoria')
        }
    }

    deleteCategoryFromStore(id) {
        try {
            this.myStore.delCategory(id)
                .then(() => {
                    this.myView.renderDelCategory(catDeleted)
                })
                .catch((error) => this.myView.showMessage(error))
        } catch (error) {
            this.myView.showMessage(error, 'Error al eliminar la categoria')
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
}

module.exports = Controller