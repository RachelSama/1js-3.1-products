const category = require('./category.class');
const product = require('./product.class');
const SERVER = 'http://localhost:3000'


class store {

    constructor(id, name) {

        this.id = id
        this.name = name
        this.products = []
        this.categories = []
    }

    async getInfo(searched) {
        const response = await fetch(SERVER + '/' + searched)
        const posts = await response.json()
        return posts
    }

    async loadData() {

        try {
            var categoriasData = await this.getInfo('categories')
            categoriasData.forEach((categoria) => {
                const newCat = new category(categoria.id, categoria.name, categoria.description)
                this.categories.push(newCat)
            })

        } catch (err) {
            console.error(err)
            return;
        }

        try {
            var productosData = await this.getInfo('products')
            productosData.forEach((producto) => {
                const newProd = new product(producto.id, producto.name, producto.category, producto.price, producto.units)
                this.products.push(newProd)
            })

        } catch (err) {
            console.error(err)
            return;
        }
    }

    productNameExist(name, id) {
        let prod = this.products.find(product => product.name === name);
        if (prod) {
            if (id) {
                if (prod.id != id) {
                    return true
                } else {
                    return false
                }
            }
            return true
        } else {
            return false
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

    addCategory(payload) {

        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        let cat = null
        try {
            cat = this.getCategoryByName(payload.name)
        } catch (error) { }

        if (cat != null) {
            throw 'Error! ' + payload.name + ' ya es un nombre de una categoria'
        }

        let data = {
            name: payload.name,
            description: payload.description,
        }

        return new Promise((resolve, reject) => {
            fetch(SERVER + '/categories', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataCat => {

                    let newCategory = new category(dataCat.id, dataCat.name, dataCat.description)
                    this.categories.push(newCategory)

                    resolve(newCategory)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
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

        let data = {
            name: payload.name,
            price: payload.price,
            category: payload.category,
            units: payload.units
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/products', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }

                    return response.json()
                })
                .then(dataProd => {

                    let newProduct = new product(dataProd.id, dataProd.name, dataProd.category, dataProd.price, dataProd.units)
                    this.products.push(newProduct)

                    resolve(newProduct)

                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
    }

    sumUnitsToProduct(id) {
        let prod = this.getProductById(id);
        let unitsPlus = prod.units + 1

        let data = {
            name: prod.name,
            price: prod.price,
            category: prod.category,
            units: unitsPlus
        }

        return new Promise((resolve, reject) => {
            fetch(SERVER + '/products/' + prod.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataProd => {

                    let prod = this.getProductById(dataProd.id);

                    prod.name = dataProd.name
                    prod.category = dataProd.category
                    prod.price = dataProd.price
                    prod.units = dataProd.units

                    resolve(prod)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
    }

    restUnitsToProduct(id) {
        let prod = this.getProductById(id);
        let unitsRest = prod.units - 1

        if (prod.units == 0) {
            throw 'No se puede restar unidades si no hay unidades'
        }

        let data = {
            name: prod.name,
            price: prod.price,
            category: prod.category,
            units: unitsRest
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/products/' + prod.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataProd => {

                    let prod = this.getProductById(dataProd.id);

                    prod.name = dataProd.name
                    prod.category = dataProd.category
                    prod.price = dataProd.price
                    prod.units = dataProd.units

                    resolve(prod)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
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

        let data = {
            name: payload.name,
            price: payload.price,
            category: payload.category,
            units: payload.units
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/products/' + payload.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataProd => {

                    let prod = this.getProductById(dataProd.id);

                    prod.name = dataProd.name
                    prod.category = dataProd.category
                    prod.price = dataProd.price
                    prod.units = dataProd.units

                    resolve(prod)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
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
            if (catSearched.id != payload.id) {
                throw 'Error! ' + payload.name + ' ya es un nombre de una categoria'
            }
        }

        let data = {
            name: payload.name,
            description: payload.description
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/categories/' + payload.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataCat => {

                    let cat = this.getCategoryById(dataCat.id)

                    cat.name = dataCat.name
                    cat.description = dataCat.description

                    resolve(cat)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
    }

    delCategory(id) {
        let existCategory = this.getCategoryById(id)
        let haveProducts = this.getProductsByCategory(id)

        if (!existCategory || haveProducts.length !== 0) {
            throw 'No se puede eliminar la categoria porque tiene productos'
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/categories/' + id, {
                method: 'DELETE',
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataCat => {

                    this.categories = this.categories.filter(category => category.id !== dataCat.id)

                    resolve(existCategory)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
    }

    delProduct(id) {
        let existProduct = this.getProductById(id)
        if (!existProduct) {
            throw 'No se puede eliminar el producto porque no existe'
        }

        if (existProduct.units > 0) {
            throw 'No se puede eliminar el producto porque tiene unidades disponibles'
        }
        return new Promise((resolve, reject) => {
            fetch(SERVER + '/products/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Error ${response.status} de la BBDD: ${response.statusText}`
                    }
                    return response.json()
                })
                .then(dataProd => {

                    this.products = this.products.filter(product => product.id !== dataProd.id)
                    resolve(existProduct)
                })
                .catch(err => reject('Error en la petición HTTP: ' + err.message))
        })
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