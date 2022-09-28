const { time } = require("console");
const { address } = require("ip");
const fs = require("fs");
const net = require("net");
const os = require("os");
const line = require("./line_util");
const util = require("./util");
const client = require("./client");
const readline = require("readline");
const Table = require("./Table.js");

// Set allow at most 250 lines
const MAX_NUMBER_OF_LINES = 250;
const CHAR_PER_LINE = 40;

// Toy data
let samp = Buffer.alloc(MAX_NUMBER_OF_LINES * CHAR_PER_LINE);
fs.readFile("./5_sample.csv", "utf8", function (err, data) {
  if (err) throw err;
  // samp.write(data.split("\x00"));
  samp = data;
});

const server = net.createServer((socket) => {
  socket.on("data", function (data) {
    remote_IP_Port = socket.remoteAddress + socket.remotePort;
    console.log(
      socket.remoteAddress + ":" + socket.remotePort,
      " said: " + data
    );
  });
});

server.on("connection", (socket) => {
  socket.setTimeout(1000 * 5);
  for (var i = 0; i < 240; i++) {
    socket.write(
      "69.69." +
        Math.floor(Math.random() * 255) +
        "." +
        i +
        ":" +
        (i * 10 + Math.floor(Math.random() * 255)) +
        "," +
        util.get_time() +
        "," +
        Math.floor(Math.random() * 10) +
        "\n"
    );
    socket.write("fuck");
  }
  console.log(
    "Request from " + socket.remoteAddress + ":" + socket.remotePort + " done"
  );
  socket.end();
});

server.on("timeout", function (skt) {
  skt.write("socket timed out!");
  skt.end();
});

server.listen(9999, function () {
  console.log("Instance 9999 Listening");
});

server.on("error", () =>
  server.listen(9999, function () {
    console.log("Instance 6968 Listening");
    var host_port = 6968;
  })
);

// const vibe_check = setInterval(() => {
//   update_host_entry(util.get_time() % 10);
// }, 3000);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "!") table.pretty_print();
  else if (parseInt(input) < 10 && parseInt(input) >= 0) {
    table.update_host(parseInt(input));
  } else if (input[0] == "+") {
    try {
      const [inq_ip, inq_port] = input.split("+")[1].split(":");
      client.inquire(
        inq_ip,
        inq_port,
        host_ip,
        host_port,
        util.get_time(),
        undefined,
        table
      );
    } catch (e) {
      console.log(e);
    }
  }
});
