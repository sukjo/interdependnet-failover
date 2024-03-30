let http = require("http");
let fs = require("fs");
let path = require("path");
let PORT = process.env.PORT || 8080;

let server = http.createServer((request, response) => {
  let contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  let filePath = path.join(
    __dirname,
    "public",
    request.url === "/" ? "index.html" : request.url
  );

  let extname = path.extname(filePath);
  let contentType = contentTypes[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        res.writeHead(500);
        res.end("Server Error: ${err.code}");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
