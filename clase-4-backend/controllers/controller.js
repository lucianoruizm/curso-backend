const axios = require('axios')

const item = (req, res) =>{
    res.send('items');
}

const itemsList = (req, res)  =>{
    res.json({
        item1: "lechuga",
        item2: "manzana"
    })
}

const consultaAxios = async (req, res) =>{
    try {
        const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.params.name,{ timeout: 10000 })
        res.status(200).json({status: respuesta.status, data: respuesta.data})
    } catch (error) {
        res.status(404).json({status: error.response.status, data:error.response.data})
    }
}


module.exports = {item,itemsList, consultaAxios}