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

// LinkedList-Hashmap-like data structure
const line_queue = new Map();

// Get server address
var nwitf = os.networkInterfaces();
const host_ip = nwitf["en0"][1][address];
const host_port = 6969;

// Toy data
let samp_10 = Buffer.alloc(MAX_NUMBER_OF_LINES * CHAR_PER_LINE);
fs.readFile("./10_sample.csv", "utf8", function (err, data) {
  if (err) throw err;
  samp_10.write(data);
});

const table = new Map();
const host_entry = [host_ip + host_port, [NaN, NaN]];
const update_host_entry = (digit) => {
  host_entry[1] = [util.get_time(), digit];
  table.set(host_ip + host_port, [util.get_time(), digit]);
};

line_handler = line.line_to_entry;

let acc = new Buffer.alloc(0);
const handler = (data, socket) => {
  // check for delimiter character
  let offset = data.indexOf(0);
  if (offset !== -1) {
    // get the whole message into one Buffer
    let msg = Buffer.concat(acc, data.slice(0, offset));

    // put rest of data into the accumulatedData buffer as part of next piece of data
    // skip past the delimiter
    accumulatedData = data.slice(offset + 1);

    // emit that we now have a whole msg
    socket.emit("_msg", msg);
  } else {
    // no delimiter yet, just accumulate the data
    accumulatedData = Buffer.concat(accumulatedData, data);
  }
};

const server = net.createServer((socket) => {
  socket.on("data", function (data) {
    const readSize = socket.bytesRead;

    const entry = line_handler(data, host_entry);

    remote_IP_Port = socket.remoteAddress + socket.remotePort;
    // if (line_queue.has(remote_IP_Port))
    //   line_queue.set(remote_IP_Port, [
    //     ...line_queue.get[remote_IP_Port],
    //     entry,
    //   ]);
    // else line_queue.set(remote_IP_Port, [entry]);

    console.log(
      "Remote IP:Port " + socket.remoteAddress + ":" + socket.remotePort,
      "\nRaw Data: " + data + "; Packet size: " + readSize
    );
    console.log("\nParsed:", entry);
  });
});

server.on("connection", (socket) => {
  socket.setTimeout(1000 * 5);
  console.log(
    "New hot damn connection from " +
      socket.remoteAddress +
      ":" +
      socket.remotePort
  );
  socket.write(samp_10);
  console.log();
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
