require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const { hostname } = require('os');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


//this works on all requests
app.use( function middleware(req, res, next){
    console.log(req.method + " "+req.path+" - "+ req.ip);
    next();
})

//this is for accessing form data sent with POST requests
app.use(express.urlencoded({ extended: true }));

//creating a temporary memory
const urlArray = ["lol.com"];

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',(req, res)=>{
  const url = req.body.url
  const hostname = new URL(url).hostname;
  console.log(hostname, "is being verified for existence");
  dns.lookup(hostname, (err, address, family)=>{
    if(err){
      res.json({error: 'invalid url'});
    }else{
  if(urlArray.includes(url)){
    const urlNumber = urlArray.indexOf(url);
    res.json({original_url: url, short_url:urlNumber})
  }else{
  urlArray.push(url);
  const urlNumber = urlArray.indexOf(url);
    res.json({original_url: url, short_url:urlNumber});
  }  
  }
  console.log(hostname, address, family);
  });
  console.log(req.method, req.ip, urlArray);
})

app.get('/api/shorturl/:short_url', (req,res)=>{
  const shortUrl = req.params.short_url;
  const originalUrl = urlArray[shortUrl];
  res.redirect(originalUrl);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

