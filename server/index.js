const http = require("http");
const fs = require("fs");
const path = require("path");

const hostName = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request from " + req.url + " by method of " + req.method);

  if (req.method == "GET") {
    var fileURL;
    if (req.url == "/") {
      fileURL = "/index.html";
    } else {
      fileURL = req.url;
    }
    var filePath = path.resolve("./public" + fileURL);
    var fileExt = path.extname(filePath);

    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Whoops sorry " +
              fileURL +
              " does Not Exists</h1></body></html>"
          );
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          fs.createReadStream(filePath).pipe(res);
        }
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Whoops sorry " +
          fileURL +
          " not a HTML</h1></body></html>"
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Whoops sorry " +
        fileURL +
        " Not Supported</h1></body></html>"
    );
  }
});
server.listen(port, hostName, () => {
  console.log(`server Running at http://${hostName}:${port}`);
});
