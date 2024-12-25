const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(__dirname + '/dist/browser'));

app.get('/', (req, res) => {
  console.log(__dirname);
  console.log(path.join(__dirname, '/dist/browser/index.html'));
  res.sendFile(__dirname + '/dist/browser/index.html');
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server running on port ${PORT}`);
});
