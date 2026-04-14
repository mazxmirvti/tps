const express = require('express')
const app = express()

const porta = 3000


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

app.get('/chi-siamo', (req, res) => {
  res.sendFile(__dirname+"/chi-siamo.html");
})

app.get('/cosa-facciamo', (req, res) => {
  res.sendFile(__dirname+"/cosa-facciamo.html");
})

app.get('/modulo', (req, res) => {
  res.sendFile(__dirname+"/modulo.html");
})

app.listen(porta, () => {
  console.log('Servizio in ascolto sulla porta: ' + porta)
})