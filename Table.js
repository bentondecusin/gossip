const util = require("./util");
const { Entry } = require("./Entry.js");

module.exports.Table = class Table {
  host_ip;
  host_port;
  host_ts;
  host_digit;
  ip_map = new Map(); // ip_map: ip -> entry_arr

  constructor(ip = "127.0.0.1", port = "6969", mad = false) {
    this.ip_map = new Map();
    this.host_ip = ip;
    if (mad) ip_map.this.host_port = port;
  }

  update_host = (digit) => {
    this.host_digit = digit;
    this.host_ts = util.get_time();
  };

  add_entry = (ip, port, ts, digit) => {
    if (ip == this.host_ip || port == this.port) return;
    if (this.ip_map.get(ip) == undefined) {
      this.ip_map.set(ip, new Entry(port, ts, digit));
    } else this.ip_map.get(ip).add_entry(port, ts, digit);
  };

  pretty_print = () => {
    console.log(this.host_ip, this.host_port, this.host_ts, this.host_digit);
    this.ip_map.forEach((entry, ip) => console.log(ip, entry.entry_arr));
  };
};
