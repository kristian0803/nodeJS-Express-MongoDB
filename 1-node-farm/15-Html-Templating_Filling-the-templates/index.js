/* ----FILES---- */

// 8. Reading and writting files
/* 
// Blocking, synchronous way
const fs = require("fs");

// fs.readFileSync(path[, options])
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now().toLocaleString(
  "in-ID"
)}`;

// fs.writeFileSync(file, data[, options])
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
 */

// 10. Reading and writting files asynchronously
/* 
// Non-blocking, asynchronous way
const fs = require("fs");
// ↪ read-this

// fs.readFile(path[, options], callback)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR! 💥");

  // ↪ The avocado 🥑 is also used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      // write final.txt
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written 👍");
      });
    });
  });
});
console.log("Will read file!");
 */

/* ----SERVER---- */
// 11. Creating a simple web server
/* 
const http = require("http");

const server = http.createServer((req, res) => {
  // get response
  // This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
  // console.log(req); 📌look at req.txt to see this req object
  res.end("Hello from the server!");
});

// Starts the HTTP server listening for connections.
// use standar ip address localhost
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
 */

// 12. Routing
/* 
const http = require("http");
const url = require("url");

// http.createServer([options][, requestListener])
const server = http.createServer((req, res) => {
  // get response
  // This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
  console.log(req.url);
  // 💻 /
  // 💻 /favicon.ico
  const pathName = req.url;

  // if the pathNmae is the root "/" or if it's the "/overview"
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Starts the HTTP server listening for connections.
// use standar ip address localhost
// server.listen([port[, host[, backlog]]][, callback])
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
 */

// 13. Building a (Very) simple API
/* 
const http = require("http");
// const url = require("url");
const fs = require("fs");

// 📌 2) read file synchronously and only gets executed once right in the beginning.
// 📌 __dirname refers where the current file is executed
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// http.createServer([options][, requestListener])
const server = http.createServer((req, res) => {
  // get response
  // This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
  console.log(req.url);
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");

    // Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    // API page
  } else if (pathName === "/api") {
    // fs.readFile("./dev-data/data.json"); 📌 1)
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   // console.log(productData);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    // });
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    res.end(console.log(dataObj));

    // Not found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Starts the HTTP server listening for connections.
// use standar ip address localhost
// server.listen([port[, host[, backlog]]][, callback])
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
 */

// 14. HTML Templating: Building the templates

// 15. HTML Templating: Filling the templates

const http = require("http");
const url = require("url");
const fs = require("fs");

// 📍 5) Function for replace the placeholder with the real piece of data.
// const cardsHtml = dataObj
// .map((el) => replaceTemplate(tempCard, el))
// .join("");
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  // 📌 Change the style conditionally either organic or not organic.
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

// 📍 2) Read all the templates once at the begining.
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// 📍 4) loop through this array object, and for each of them, replace the placeholders in the template with the actual data from the current product.
const dataObj = JSON.parse(data);
console.log(dataObj);

// http.createServer([options][, requestListener])
const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  // const pathname = req.url;

  const { query, pathname } = url.parse(req.url, true);

  // 📍 1) Overview page
  if (pathname === "/" || pathname === "/overview") {
    // 📍3) Get a response from the server for the request that has been sent.
    res.writeHead(200, { "Content-type": "text/html" });

    // 📍 4) loop through the array object.
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    console.log(cardsHtml);
    // 💻 see 📁txt/cardsHtml.html for the result

    // 📍 6) Replace {%PRODUCT_CARDS%} placeholder with cardsHtml element
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    // 📍 7) Shows the output
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    // console.log(query);
    // ↪ [Object: null prototype] { id: '0' }

    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API page
  } else if (pathname === "/api") {
    // fs.readFile("./dev-data/data.json");
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   // console.log(productData);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   res.end(data);
    // });
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Starts the HTTP server listening for connections.
// use standar ip address localhost
// server.listen([port[, host[, backlog]]][, callback])
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
