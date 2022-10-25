const category = require('./category.class');
const product = require('./product.class');
const data = require('./datosIni.json');

class store {

    constructor(id, name) {

        this.id = id
        this.name = name
        this.products = []
        this.categories = []
    }

    loadData() {
        data.categories.forEach((categoryData) => {
            let cat = new category(categoryData.id, categoryData.name, categoryData.description)
            this.categories.push(cat)
        })
        data.products.forEach((prodData) => {
            let prod = new product(prodData.id, prodData.name, prodData.category, prodData.price, prodData.units)
            this.products.push(prod)
        })
    }

    productNameExist(name, id) {
        let prod = this.products.find(product => product.name === name);
        if(id) {
            if (prod.id != id) {
                return true
            }
        } else {
            if (!prod) {
                return false
            }
            return true
        }
        
    }

    getCategoryById(id) {

        let cat = this.categories.find(category => category.id == id);
        if (!cat) {
            throw 'No existe una categoria con id: ' + id
        }
        return cat
    }

    getCategoryByName(name) {

        let cat = this.categories.find(category => category.name.toLowerCase() === name.toLowerCase());

        if (cat == null) {
            throw 'No existe una categoria con name: ' + name
        } else {
            return cat
        }
    }

    getProductById(id) {

        let prod = this.products.find(product => product.id == id)

        if (prod == null) {
            throw 'No existe un producto con id: ' + id
        }
        return prod
    }

    getProductsByCategory(id) {

        return this.products.filter(product => product.category == id)
    }

    addCategory(nombre, descripcion = 'No hay descripción') {

        if (!nombre.trim()) {
            throw 'Debe tener un nombre definido'
        }

        let cat = null
        try {
            cat = this.getCategoryByName(nombre)
        } catch (error) { }

        if (cat != null) {
            throw 'Error! ' + nombre + ' ya es un nombre de una categoria'
        }

        let newId = 0

        if (this.categories.length > 0) {

            let bigCategory = this.categories.reduce((max, category) => max.id > category.id ? max : category)

            if (bigCategory) {
                newId = bigCategory.id
            }
        }

        newId += 1

        let newCategory = new category(newId, nombre, descripcion)
        this.categories.push(newCategory)

        return newCategory
    }

    addProduct(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        if (!payload.category || !this.getCategoryById(payload.category)) {
            throw 'No existe la categoria o no la has introducido'
        }

        if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw 'El precio no es correcto'
        }

        if (payload.units) {
            if (payload.units < 0) {
                throw 'Las unidades no son correctas, debe ser mayor de 0'
            } else if (isNaN(payload.units)) {
                throw 'Las unidades no son correctas, debe ser un numero'
            } else if (payload.units % 1 != 0) {
                throw 'Las unidades no son correctas, debe ser un numero entero'
            }

        }

        let newId = 0

        if (this.products.length > 0) {

            let bigProduct = this.products.reduce((max, product) => max.id > product.id ? max : product)

            if (bigProduct) {
                newId = bigProduct.id;
            }
        }

        newId += 1

        let newProduct = new product(newId, payload.name, payload.category, payload.price, payload.units)
        this.products.push(newProduct)

        return newProduct
    }

    sumUnitsToProduct(id) {
        let prod = this.getProductById(id);
        prod.units = prod.units + 1
        return prod
    }

    restUnitsToProduct(id) {
        let prod = this.getProductById(id);

        if (prod.units == 0) {
            throw 'No se puede restar unidades si no hay unidades'
        }

        prod.units = prod.units - 1
        return prod
    }

    editProduct(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        if (!payload.category || !this.getCategoryById(payload.category)) {
            throw 'No existe la categoria o no la has introducido'
        }

        if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw 'El precio no es correcto'
        }

        if (payload.units) {
            if (payload.units < 0) {
                throw 'Las unidades no son correctas, debe ser mayor de 0'
            } else if (isNaN(payload.units)) {
                throw 'Las unidades no son correctas, debe ser un numero'
            } else if (payload.units % 1 != 0) {
                throw 'Las unidades no son correctas, debe ser un numero entero'
            }
        }

        let prod = this.getProductById(payload.id);

        prod.name = payload.name
        prod.category = payload.category
        prod.price = payload.price
        prod.units = payload.units

        return prod;

    }

    editCategory(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        let catSearched = null
        try {
            catSearched = this.getCategoryByName(payload.name)
        } catch (error) { }

        if (catSearched != null) {
            throw 'Error! ' + payload.name + ' ya es un nombre de una categoria'
        }

        let cat = this.getCategoryById(payload.id)

        cat.name = payload.name
        cat.description = payload.description

        return cat
    }

    delCategory(id) {
        let existCategory = this.getCategoryById(id)
        let haveProducts = this.getProductsByCategory(id)

        if (!existCategory || haveProducts.length !== 0) {
            throw 'No se puede eliminar la categoria porque tiene productos'
        }
        this.categories = this.categories.filter(category => category.id !== id)

        return existCategory;

    }

    delProduct(id) {
        let existProduct = this.getProductById(id)
        if (!existProduct) {
            throw 'No se puede eliminar el producto porque no existe'
        }

        if (existProduct.units > 0) {
            throw 'No se puede eliminar el producto porque tiene unidades disponibles'
        }

        this.products = this.products.filter(product => product.id !== id)
        return existProduct;
    }

    totalImport() {
        return total = this.products.reduce((total, product) => total += product.productImport(), 0)
    }

    orderByUnitsDesc() {
        return this.products.sort((a, b) => a.units < b.units ? 1 : -1);
    }

    orderByName() {
        return this.products.sort((a, b) => a.name.localeCompare(b.name));
    }

    underStock(units) {
        return this.products.filter(product => product.units < units)
    }
}

module.exports = store