const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(__dirname + '/dist/frontend/browser'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/frontend/browser/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
