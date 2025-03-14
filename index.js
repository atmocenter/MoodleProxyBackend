  
const express = require('express')
var morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')
var httpProxy = require('http-proxy')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3333;
const path = require('path');

app.use(cors(
    {
        origin: '*'
    }
))


//pass api request in original request to proxy server
// format: /moodle/apirequest

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  

apiReq = ""
// Logging
app.use(morgan('dev'));

let options = {
    target: 'localhost.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        [`^/moodle`]: '',
    }
}
// Authorization
app.use('', (req, res, next) => {
    console.log("original url1: " +req.originalUrl )
    url = req.originalUrl.substring(8)
    console.log("original url1: " +req.originalUrl )
 
    options.target = API_SERVICE_URL
 
    console.log(' empty .use ran')
  
    apiReq = url
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });

 const targ = (req)=>{
    console.log(req)
    return req.substring(8)
}


app.use('/moodle', (req, res, next) => {

    console.log("original url: " +req.originalUrl)
url = req.originalUrl.substring(8)
    console.log("url: " +url)
    
    apiReq = url
    const proxyy = httpProxy.createProxyServer({})
    proxyy.web(req,res,{
        target: url,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            [`^/moodle`]: '',
        }})
    // next()
 });
 



app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });


 
app.listen(port,()=>{
    console.log("okay listening")
})

 