const util = require("./util");
const { Entry } = require("./Entry.js");

module.exports.Table = class Table {
  host_ip;
  host_port;
  host_ts;
  host_digit;
  ip_map = new Map(); // ip_map: ip -> entry_arr

  Table(ip = "127.0.0.1", port = "6969") {
    this.ip_map = new Map();
    this.host_port = ip;
    this.host_port = port;
    host_ts = util.get_time();
  }
  update_host = (digit) => {
    this.digit = digit;
    this.host_ts = util.get_time();
  };

  add_entry = (ip, port, ts, digit) => {
    if (ip == this.host_ip || port == this.port) return;
    if (this.ip_map.get(ip) == undefined) {
      this.ip_map.set(ip, new Entry(port, ts, digit));
    } else this.ip_map.get(ip).add_entry(port, ts, digit);
  };

  pretty_print = () =>
    this.ip_map.forEach((entry, ip) => console.log(ip, entry.entry_arr));
};
