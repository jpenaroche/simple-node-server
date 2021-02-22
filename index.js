const http = require("http");

const port = 3001;

http
  .createServer((req, res) => {
    const buff = [];
    req.on("data", (data) => {
      buff.push(data);
    });
    req.on("end", () => {
      console.info("LOG: ", Buffer.concat(buff).toString());
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS" || req.method === "POST") {
      res.writeHead(200);
      res.end();
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("not allowed method");
    }
  })
  .listen(port, () => {
    console.log(`Server is listening through port: ${port}`);
  });
