module.exports.Entry = class Entry {
  port;
  entry_arr = []; // entry_arr: idx -> entry_arr[i] = [port, ts, digit]

  constructor(port, ts, digit) {
    this.entry_arr = [[port, ts, digit]];
  }

  pretty_print = () => console.log(this.entry_arr);
  add_entry = (port, ts, digit) => {
    // If empty, insert
    if (this.entry_arr.length == 0) this.entry_arr = [[port, ts, digit]];

    // Check if port exists
    for (var i in this.entry_arr)
      if (this.entry_arr[i][0] === port) {
        if (this.entry_arr[i][1] <= ts) {
          // Check if entry ts is older than the current one
          this.entry_arr[i][2] = digit;
          this.entry_arr[i][1] = ts;
        }
        return;
      }
    // If not exists, add to entry_arr if there's space
    if (this.entry_arr.length < 3) this.entry_arr.push([port, ts, digit]);
    // Otherwise kick out the oldest one if older than ts
    else {
      var oldest_ts = 6969696969;
      var oldest_idx = 0;
      // Find the oldest entry's index
      for (var i in this.entry_arr)
        if (this.entry_arr[i][1] < oldest_ts) {
          oldest_ts = this.entry_arr[i][1];
          oldest_idx = i;
        }

      // If older, then kick out the oldest
      if (oldest_ts < ts) this.entry_arr[oldest_idx] = [port, ts, digit];
    }
  };
};
