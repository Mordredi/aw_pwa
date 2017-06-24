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
  fs.readFile('./dist/index.html', 'utf8', function (err, data) {
    if (err) throw err;
    const document = data.replace(/<div id="root">j\/div>/, `<div id="app">${html}</div>`);
    res.send(document);
  });
}

const app = express();

app.use('/', express.static(path.join(__dirname, '/')));

app.get('*', handleRender)

app.listen(3000, () => {
  console.log('listening on port 3000');
});

