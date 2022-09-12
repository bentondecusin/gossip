/**
 * The line module provides the line protocol.
 * Each line has three fields:
 * 1. Node identifier: x.x.x.x:port
 * 2. Time stamp: seconds since 1970 1/1 0:0:0;
 * 3. Digit
 */

// Call charCodeAt() to examine the ascii code
exports.line_to_entry = (line) => {
  //toy data 10.49.67.39 6969
  return ["10.49.67.39:6969", [1662945837, 5]];
};

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
