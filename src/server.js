import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/App';

const handleRender = (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )
  
  const manifest = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf8'));
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Arthur Wright</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="${manifest['vendor.css']}" rel="stylesheet">
        <link href="${manifest['main.css']}" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <style src="${manifest['manifest.js']}"></style>
        <style src="${manifest['vendor.js']}"></style>
        <style src="${manifest['main.js']}"></style>
      </body>
    </html>
  `);
}

const app = express();

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});


app.use('/', express.static(path.join(__dirname, '/')));

app.get('*', handleRender)



app.listen(3000, () => {
  console.log('listening on port 3000');
});

