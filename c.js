const net = require("net");
const util = require("./util");
const { lines_to_entries, translate_entries } = require("./line_util");
const Table = require("./Table.js");

const client = new net.Socket();
client.connect(remote_port, remote_ip, () => {});
client.on("error", () => console.log("Inquire Failed"));
client.on("data", function (raw_data) {});
client.setMaxListeners
