//  --- ⛔  17. Using Modules 2: Our Own Modules ⛔ ---

// Modules
const http = require("http");
const url = require("url");
const fs = require("fs");

// 📍 3) import 📁modules.js/replaceTemplate.js
const replaceTemplate = require("./modules/replaceTemplate");

// const cardsHtml = dataObj
// .map((el) => replaceTemplate(tempCard, el))
// .join("");

// 📍 1) Move this function to 📁modules/replaceTemplate.js
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   // 📌 Change the style conditionally either organic or not organic.
//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   }
//   return output;
// };

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

const dataObj = JSON.parse(data);
// console.log(dataObj);

// http.createServer([options][, requestListener])
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(url.parse(req.url, true));
  // const pathname = req.url;

  // destructuring url.parse object
  const { query, pathname } = url.parse(req.url, true);
  // query: [Object: null prototype] { id: '0' },
  // pathname: '/product',

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHtml);
    // 💻 see 📁txt/cardsHtml.html for the result

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    // const { query, pathname } = url.parse(req.url, true);
    // pathname: '/product',
    // query: [Object: null prototype] { id: '0' },
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    console.log(output);
    // 💻 Take a look at 📁txt/product-id-0.html
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
  console.log("Listening to requests on port 127.0.0.1:8000");
});

// ♨_♨ --- END SECTION --- ♨_♨
