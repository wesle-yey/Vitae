const express = require('express')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/curriculo', (req, res) => {
  res.render('curriculo')
})

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080')
})
