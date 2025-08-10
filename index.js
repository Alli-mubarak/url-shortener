require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

//this is for accessing form data sent with POST requests
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',(req, res)=>{
  res.json({original_url: req.body.url, short_url:11})
  console.log(req.method, req.hostname, req.ip);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
