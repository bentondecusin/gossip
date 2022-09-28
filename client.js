const net = require("net");
const util = require("./util");
const { lines_to_entries, translate_entries } = require("./line_util");
const Table = require("./Table.js");

exports.inquire = async (
  remote_ip = "127.0.0.1",
  remote_port = 6969,
  host_ip,
  host_port,
  host_ts,
  host_digit,
  table
) => {
  const client = new net.Socket();
  client.connect(remote_port, remote_ip, () => {});
  client.on("error", () => console.log("Inquire Failed"));
  client.on("data", function (raw_data) {
    let entries = lines_to_entries(raw_data.toString());
    let translated = translate_entries(
      entries,
      host_ip + ":" + host_port,
      host_ts,
      host_digit
    );
    if (translated == undefined)
      console.log(remote_ip + ":" + remote_port, "is sending bullshit");
    else
      translated.forEach((ts_digit, ip_port) => {
        [ip, port] = ip_port.split(":");
        table.add_entry(ip, port, ts_digit[0], ts_digit[1]);
      });
    console.log(
      "Fetching data from",
      remote_ip + ":" + remote_port,
      "complete"
    );
    table.pretty_print();
  });
};
