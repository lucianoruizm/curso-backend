const express = require('express')
const app = express()
const port = 3000

//index
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//URN
app.get('/alumnos/listado', (req, res) => {
    //JS Object notation
    res.json({
        //KEY  :  //VALUE 
        alumno1: "John",
        alumno2: "Andrea",
        alumno3: "Alice",
        cant: 3
    })
})

// Rutas parametrizadas
// A travez del param se crea nuevo valor ejemplo:
// http://localhost:3000/alumno/nombre/Ben/apellido/Kenobi se crea Ben Kenobi
// Por defecto ubicar las RP debajo, tener cuidado de
// que no se pisen con otras rutas
// Es buena práctica escribir la ruta de la siguiente manera
// '/alumno/nombre/:nombre/apellido/:apellido' Las RP de esar
// se hacen mas legibles para el frontend
app.get('/alumno/nombre/:nombre/apellido/:apellido', (req, res) => {
    //JS Object notation
    res.send(`Hello There! I am ${req.params.nombre} and my last name is ${req.params.apellido}`)
})

// Query: las query inicia asi ---> ? key=value & ---> indica que se coloca otra clave key= value si se quiere agregar...
// escribir url teniendo en cuenta el número de puerto que se asigno:
// http://localhost:3000/persona?nombre=Luke&apellido=Skywalker
app.get('/persona', (req, res) => {
    //JS Object notation
    res.send(`Hello There! I am ${req.query.nombre} and my last name is ${req.query.apellido}`)
})



// Task 1:
app.get('/presentacion', (req, res) => {
    res.send(`Hola mi nombre es: ${req.query.nombre} y soy de ${req.query.lugar}`)
})


// Task 2:
app.get('/division/num1/:num1/num2/:num2', (req, res) => {
    let num1 = Number(req.params.num1)
    let num2 = Number(req.params.num2)
    let resultado = num1 / num2  
    res.send(`${num1} / ${num2} = ${resultado}`)
})



// Params + Query
// http://localhost:3000/persona/nombre/Leia?apellido=Organa
app.get('/persona/nombre/:nombre', (req, res) => {
    //JS Object notation
    res.send(`Hello There! I am ${req.params.nombre} and my last name is ${req.query.apellido}`)
})

//URL
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})