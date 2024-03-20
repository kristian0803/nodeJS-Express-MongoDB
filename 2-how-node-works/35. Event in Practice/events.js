// 📍 1) import module
const EventEmitter = require("node:events");
const http = require("node:http");

// 📍 2) Creat a new EventEmitter object
// const myEmitter = new EventEmitter();

// 📍 7) Creat a new class sales
// for best pratice, that will actually inherit from the node EventEmitter
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// 📍 8) new emitter object
const myEmitter = new Sales();

// 📍 3) Adds the listener function
// to the end of the listeners array for the event named eventName.
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Udin");
});

// 📍 6) Listener with parameter
myEmitter.on("newSale", (stocks) => {
  console.log(`There are now ${stocks} items left in stok.`);
});

// 📍 4) Calls emit functions
// Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
// myEmitter.emit("newSale");

// 📍 5) Passing arguments to listeners
myEmitter.emit("newSale", 9);

// 📍 9) Create a small web server
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request ❄");
});

server.on("close", () => {
  console.log("Server closed");
});

// 📍 10) Starts the server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 127.0.0.1:8000");
});
