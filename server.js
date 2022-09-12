const { time } = require("console");
const net = require("net");
const line = require("./line");

// LinkedList-Hashmap-like data structure
const line_queue = new Map();

const host_entry = [NaN, [NaN, NaN]];
const update_host_entry = (digit) => (host_entry = [, [time]]);

line_handler = (data) => {
  entry = line.line_to_entry(data);
  line_queue.set(entry[0], entry.subarray(1, 3));
};

const server = net.createServer((socket) => {
  socket.on("data", function (data) {
    const readSize = socket.bytesRead;
    console.log(
      "Remote IP: " +
        socket.remoteAddress +
        "; Remote Port: " +
        socket.remotePort,
      "\nData Got：" + data.toString(),
      "Translated: " + line.line_to_entry(data),
      "\nData Length: " + readSize
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
