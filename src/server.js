let http = require("http");
let fs = require("fs");
let path = require("path");
let PORT = process.env.PORT || 3000;

let server = http.createServer((req, res) => {
  let contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  let extname = path.extname(filePath);
  let contentType = contentTypes[extname] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle file not found
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
          if (err) {
            // If 404.html not found, send plain text 404 response
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("File not found");
          } else {
            // Serve 404.html
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
