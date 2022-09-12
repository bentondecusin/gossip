const { time } = require("console");
const net = require("net");
const line = require("./line");

// LinkedList-Hashmap-like data structure
const line_queue = new Map();

const host_entry = [NaN, [NaN, NaN]];
const update_host_entry = (digit) => (host_entry = [, [time, digit]]);

line_handler = line.line_to_entry;

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

const server = net.createServer((socket) => {
  socket.on("data", function (data) {
    const readSize = socket.bytesRead;
    const entry = line_handler(data);
    line_queue.set(entry[0], entry[1]);
    console.log(
      "Remote IP: " +
        socket.remoteAddress +
        "; Remote Port: " +
        socket.remotePort,
      "\nRaw Data: " + data
    );
  });
  socket.on("end", function (data) {
    console.log("mad");
  });
});

server.on("connection", (skt) =>
  console.log("New connection from " + skt.remoteAddress + ":" + skt.remotePort)
);

server.listen(6969, function () {
  console.log("Instance 6969 Listening");
});

// const vibe_check = setInterval(() => {
//   console.log("a");
// }, 3000);
