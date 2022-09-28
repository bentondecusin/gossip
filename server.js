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

// Get server address
var nwitf = os.networkInterfaces();

var host_ip = "127.0.0.1";
try {
  host_ip = nwitf["en0"][1]["address"];
} catch (e) {
  try {
    host_ip = nwitf["en5"][1]["address"];
  } catch (e) {}
}

const host_port = 6969;

// Toy data
let samp = Buffer.alloc(MAX_NUMBER_OF_LINES * CHAR_PER_LINE);
fs.readFile("./5_sample.csv", "utf8", function (err, data) {
  if (err) throw err;
  // samp.write(data.split("\x00"));
  samp = data;
});

const table = new Table(host_ip, String(host_port));
const host_entry = [host_ip + host_port, [NaN, NaN]];

line_handler = line.line_to_entry;

const server = net.createServer((socket) => {
  socket.on("data", function (data) {
    const readSize = socket.bytesRead;
    const entry = line_handler(data, host_entry);
    remote_IP_Port = socket.remoteAddress + socket.remotePort;
    console.log(
      socket.remoteAddress + ":" + socket.remotePort,
      " said: " + data
    );
  });
});

server.on("connection", (socket) => {
  socket.setTimeout(1000 * 5);
  console.log(
    "New request from " + socket.remoteAddress + ":" + socket.remotePort
  );
  socket.write(samp);
  console.log(
    "Request from " + socket.remoteAddress + ":" + socket.remotePort + " done"
  );
  socket.end();
});

server.on("timeout", function (skt) {
  skt.write("socket timed out!");
  skt.end();
});

server.listen(6969, function () {
  console.log("Instance 6969 Listening");
});

// const vibe_check = setInterval(() => {
//   update_host_entry(util.get_time() % 10);
// }, 3000);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "!") table.pretty_print();
  else if (parseInt(input) < 10 && parseInt(input) >= 0)
    table.update_host(parseInt(input));
  else if (input[0] == "+") {
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
      //+122.0.0.1:22
      console.log(e);
    }
  }
});
