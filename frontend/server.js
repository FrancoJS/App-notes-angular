require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const httpProxyMiddleware = require('http-proxy-middleware');

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(__dirname + '/dist/frontend/browser'));

const backend_url = process.env.BACKEND_URL;

app.use(
  '',
  httpProxyMiddleware.createProxyMiddleware({
    target: backend_url,
    changeOrigin: true,
  }),
);
console.log(backend_url);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/frontend/browser/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
