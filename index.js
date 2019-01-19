let express = require("express");
let app = express();
let http = require("http").Server(app);
let fs = require("fs");
let path = require("path");
let bodyParser = require("body-parser");
let multer = require("multer");


app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/' }).array('file'));


//store file in the web server
app.post('/', function (req, res) {
  res.end();
  let des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      }
      else {
      }
    });
  });
})


//load files and set content type properly
app.all('/', function (req, res) {
  let filename = req.url.split('/')[req.url.split('/').length - 1];
  let suffix = req.url.split('.')[req.url.split('.').length - 1];
  if (suffix === 'css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(get_file_content(path.join(__dirname, '/', filename)));
  }
  else if (suffix === 'js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(get_file_content(path.join(__dirname, '/', filename)));
  }
});

function get_file_content(filepath) {
  return fs.readFileSync(filepath);
}


let io = require("socket.io")(http);
io.on("disconnected", function(socket) {
  console.log("a user connected");
})
app.listen(3000, function() {
  console.log("listening on 3000");
})

