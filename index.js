const express = require('express')
const path = require('path')
const rateLimit = require('express-rate-limit')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // máximo 100 requisições por IP
  message: 'Muitas requisições. Tente novamente mais tarde.',
  standardHeaders: true,     // Retorna rate limit info no header `RateLimit-*`
  legacyHeaders: false       // Desativa `X-RateLimit-*` headers
})

app.use(limiter)

// ── Headers de segurança ────────────────────────────────────
app.use((req, res, next) => {
  // Previne clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Previne MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // Ativa proteção contra XSS no navegador
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Content Security Policy (permite apenas recursos do próprio site)
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:")
  
  // Referer Policy
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade')
  
  next()
})

app.use(express.static(path.join(__dirname, 'public'), {
  etag: false   // Desativa ETags para mais segurança
}))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/curriculo', (req, res) => {
  res.render('curriculo')
})

// ── Tratamento de erros 404 ─────────────────────────────────
app.use((req, res) => {
  res.status(404).render('index')
})

// ── Tratamento de erros geral ───────────────────────────────
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('index')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
