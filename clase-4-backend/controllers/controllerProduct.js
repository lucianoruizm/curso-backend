//requerimos la libreria FS
const fs = require('fs')

const listarProductos  = async (req, res) => {
    try{
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //devolvemos el resultado
        res.status(200).json({dataJson});
        console.log(dataJson);
    }catch{
        res.status(400).send('no se pudieron mostrar los productos');
    }
}

const agregarProducto = async (req, res) =>{
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //crear el objeto el cual va a contener el informacion
        let producto = {
                //generamos el numero de id dependiendo del largo del array
                id:dataJson.length + 1,
                name: req.body.name,
                price: req.body.price,
                url: req.body.url,
                description: req.body.description
        }
        // agrego el objeto creado al array que generamos con el parseo
                      // key  :  value
        dataJson.push({product: producto});    
        console.log(producto);
        //lo volvemos a pasar a formato json
        let productJson = JSON.stringify(dataJson, null, 2); //JSON.stringify(value[, replacer[, space]]) ver info.txt
        console.log(productJson);
        //pisamos la informacion antigua con la que creamos
        await fs.promises.writeFile(`./db/product.json`,productJson);
        //devolvemos un resultado
        res.status(200).send("producto agregado");
    } catch (error) {
        res.status(400).send("no se pudo guardar el producto")
    }
}

const productoUnitario = async(req, res) => {  
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        // buscamos un producto que su numero de id concida con el numero que enviamos por parametros
        let dataUnit = dataJson.find((producto) => producto.product.id == req.params.id)
        //devolvemos el resultado
        res.status(200).json(dataUnit);
    } catch {
        res.status(400).send('producto no encontrado');
    }
}

const editarProducto = async (req, res) => {
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos 
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //dar una posicion relativa
        const id = req.params.id;
        //calcular la posicion real
        const posicion = id-1
        //colocar la informacion que va a actualizar la celda anterior
        const productoActualizado = {
            //mantenemos su id
            id: id,
            name: req.body.name,
            price: req.body.price,
            url:req.body.url,
            description: req.body.description
        };
        //darle a la informacion parseada la posicion real del producto a actualizar para que la reemplace
        dataJson[posicion] = {product: productoActualizado }
        //lo volvemos a pasar a formato json
        let productJson = JSON.stringify(dataJson, null, 2)
        //pisamos la informacion antigua con la que creamos
        await fs.promises.writeFile(`./db/product.json`,productJson);
        //devolvemos un resultado
        res.status(200).send("producto editado");
    } catch {
        res.status(400).send('no se pudo editar el producto');
    }
}

const borrarProducto = async (req, res) => {
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos 
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //limpiamos el archivo
        await fs.promises.unlink('./db/product.json')
        //creamos un array con el contenido que si queremos mantener, descartando el contenido no deseado
        let dataClear = dataJson.filter((producto) => producto.product.id != req.params.id);
        //lo volvemos a pasar a formato json
        let productJson = JSON.stringify(dataClear, null, 2)
        //guardamos el nuevo array que ya no posee el producto que descartamos
        await fs.promises.writeFile(`./db/product.json`,productJson);
        //devolvemos un resultado
        res.status(200).send("producto borrado")
    } catch {
        res.status(400).send('no se pudo borrar el producto');
    }
}

const borrarTodo = async (req, res) => {
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos 
        const data = await fs.promises.readFile('./db/product.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //reescribimos la informacon del array lleno diciendole que ahora es un array vacio
        dataJson = [] // De esta forma se actualiza a un array vacío, al contrario de usar unlink que borraria totalmente todo hasta el array
        //lo volvemos a pasar a formato json
        let productJson = JSON.stringify(dataJson, null, 2)
        //guardamos el nuevo archivo en formato vacio
        await fs.promises.writeFile(`./db/product.json`,productJson);
        //devolvemos un resultado
        res.status(200).send("base vaciada")
    } catch {
        res.status(400).send('no se pudieron borrar todos los productos');
    }
}

module.exports = {listarProductos, agregarProducto, productoUnitario, editarProducto, borrarProducto, borrarTodo}