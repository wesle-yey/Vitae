# Vitae

Gerador de currículos em PDF. A pessoa preenche um formulário com dados pessoais, experiências, formação e habilidades, e o site gera o currículo pronto para baixar.

**Demo:** [vitae-gamma.vercel.app](https://vitae-gamma.vercel.app)

![Vitae](https://raw.githubusercontent.com/wesle-yey/wesle-yey/refs/heads/main/assets/vitae.png)

## Funcionalidades

- Landing page e formulário de currículo.
- Experiências e formações adicionadas dinamicamente, quantas forem necessárias.
- Escolha do idioma do currículo.
- Geração do PDF no navegador com [pdfmake](https://pdfmake.github.io/docs/), sem enviar os dados para o servidor.

## Tecnologias

- Node.js e Express
- EJS para renderizar as páginas
- pdfmake para gerar o PDF
- express-rate-limit

## Segurança

- Rate limiting: 100 requisições por IP a cada 15 minutos.
- Cabeçalhos de segurança: Content Security Policy, `X-Frame-Options`, `X-Content-Type-Options` e `Referrer-Policy`.

## Como rodar localmente

Requisito: Node.js 18 ou mais recente.

```bash
npm install
cp .env.example .env   # opcional: define PORT e NODE_ENV
npm run dev            # com recarga automática (nodemon)
# ou
npm start
```

O servidor sobe em `http://localhost:8080`, ou na porta definida em `PORT`.

## Estrutura

```
index.js        # servidor Express, rate limiting e cabeçalhos de segurança
views/
  index.ejs     # landing page
  curriculo.ejs # formulário e geração do PDF
public/         # CSS e imagens
```
