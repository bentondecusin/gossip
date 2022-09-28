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
var spam = [false, false];
var host_ip = "127.0.0.1";
try {
  host_ip = nwitf["en0"][1]["address"];
} catch (e) {
  try {
    host_ip = nwitf["ens160"][0]["address"];
  } catch (e) {}
}

var host_port = 6969;

// Toy data
let samp = Buffer.alloc(MAX_NUMBER_OF_LINES * CHAR_PER_LINE);
fs.readFile("./5_sample.csv", "utf8", function (err, data) {
  if (err) throw err;
  // samp.write(data.split("\x00"));
  samp = data;
});

const table = new Table(host_ip, String(host_port));

line_handler = line.line_to_entry;

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
  console.log(
    "New request from " + socket.remoteAddress + ":" + socket.remotePort
  );
  if (spam[0])
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
    }
  else if (spam[1])
    for (var i = 0; i < 240; i++) socket.write("拔萃有個大仆街\n");
  else if (table.host_digit != undefined)
    socket.write(
      host_ip +
        ":" +
        host_port +
        "," +
        table.host_ts +
        "," +
        table.host_digit +
        "\n"
    );
  table.ip_map.forEach((entries, ip) =>
    entries.entry_arr.map((entry) =>
      socket.write(ip + ":" + entry[0] + "," + entry[1] + "," + entry[2] + "\n")
    )
  );
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

server.on("error", () => console.log("tf someone tries to fuck me up"));

server.setMaxListeners(10);

const vibe_check = setInterval(() => {
  if (Array.from(table.ip_map.keys()).length == 0) console.log("Nothing much");
  else {
    //randomly select one
    [inq_ip, inq_port] = table.rand_address();
    console.log(inq_ip, inq_port);
    if (inq_ip == undefined) return;
    client.inquire(
      inq_ip,
      inq_port,
      host_ip,
      host_port,
      util.get_time(),
      undefined,
      table
    );
  }
}, 3000);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "!") table.pretty_print();
  else if (input === "s") spam = [true, false];
  else if (input === "d") spam = [false, true];
  else if (input === "r") spam = [false, false];
  else if (input === "p") console.log(server);
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
