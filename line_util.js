/**
 * The line module provides the line protocol.
 * Each line has three fields:
 * 1. Node identifier: x.x.x.x:port
 * 2. Time stamp: seconds since 1970 1/1 0:0:0;
 * 3. Digit
 */

// Time window
const DELTA = 2;
const THRESH = 5;

exports.line_to_entry = (line, host_entry) => {
  let line_split = line.toString().split(",");
  if (line_split.length != 3) return null;
  else [ip_port, time_stamp, digit] = line_split;
  if (host_entry[0] == ip_port && time_stamp > host_entry[1][0]) return null;
  return [ip_port, [time_stamp, digit]];
};

exports.lines_to_entries = (lines) => {
  let lines_split = lines.split("\n");
  if (lines_split.length == 0) return undefined;
  else return lines_split.map((line) => line.split(","));
};

exports.translate_entries = (entries, host_ip_port, host_ts, host_digit) => {
  let num_false = 0;
  let translated = new Map();
  // In case empty string, spare
  for (entry of entries)
    if (entry.length == 0) continue;
    // In case empty string
    else if (entry.length != 3) {
      if (num_false++ > THRESH) return undefined;
      else continue;
    } else {
      let [ip_port, time_stamp, digit] = entry;

      // Don't fool me with your fake stamp
      if (host_ip_port == ip_port)
        if (time_stamp > host_ts && num_false++ > THRESH) return undefined;
        else if (
          time_stamp == host_ts &&
          digit != host_digit &&
          num_false++ > THRESH
        )
          return undefined;
      if (translated.has(ip_port) && translated.get(ip_port)[0] < time_stamp)
        translated.set(ip_port, [time_stamp, digit]);
      else translated.set(ip_port, [time_stamp, digit]);
    }
  return translated;
};

exports.is_address = (ip_port) => {
  ip_port_parsed = ip_port.split(":");
  if (ip_port_parsed.length !== 2) return false;
  else {
    port = parseInt(ip_port_parsed[1]);
    if (port > 65535 || port < 0) return false;
    ip_parsed = ip_port_parsed.split(".");
    if (ip_parsed.length !== 4) return false;
    ip = map(parseInt, ip_parsed);
    //TODO
  }
};

valid_time = (time) => {};

// exports.entry_to_line_buffer = (entry) => {
//   //toy data 10.49.67.39 6969
//   entry_t = [
//     String.fromCharCode(10) +
//       String.fromCharCode(49) +
//       String.fromCharCode(67) +
//       String.fromCharCode(39) +
//       String.fromCharCode(27) +
//       String.fromCharCode(57),
//     [1662945837, 5],
//   ];

//   var buffer = [
//     entry_t[0][0],
//     ".",
//     entry_t[0][1],
//     ".",
//     entry_t[0][2],
//     ".",
//     entry_t[0][3],
//     ":",
//     entry_t[0][4],
//     entry_t[0][5],
//     ",",
//   ];

//   var n = entry_t[1][0];
//   for (i = 0; i < 4; i++) {
//     mod = n % 256;
//     n = (n - mod) / 256;
//     buffer.push(mod);
//   }
//   buffer.push(",");

//   buffer.push(String.fromCharCode(entry_t[1][1]));
// };
