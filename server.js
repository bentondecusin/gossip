const { time } = require("console");
const { address } = require("ip");
const fs = require("fs");
const net = require("net");
const os = require("os");
const line = require("./line_util");
const util = require("./util");
const get_table = require("./get_table");

// Set allow at most 250 lines
const MAX_NUMBER_OF_LINES = 250;
const CHAR_PER_LINE = 40;

// Get server address
var nwitf = os.networkInterfaces();
const host_ip = nwitf["en0"][1][address];
const host_port = 6969;

// Toy data
let samp = Buffer.alloc(MAX_NUMBER_OF_LINES * CHAR_PER_LINE);
fs.readFile("./5_sample.csv", "utf8", function (err, data) {
  if (err) throw err;
  // samp.write(data.split("\x00"));
  samp = data;
});

const table = new Map();
const host_entry = [host_ip + host_port, [NaN, NaN]];
const update_host_entry = (digit) => {
  host_entry[1] = [util.get_time(), digit];
  table.set(host_ip + host_port, [util.get_time(), digit]);
};

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

const vibe_check = setInterval(() => {
  update_host_entry(util.get_time() % 10);
}, 3000);
