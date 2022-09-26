module.exports.Entry = class Entry {
  port;
  entry_arr = []; // entry_arr: idx -> entry_arr[i] = [port, ts, digit]
  oldest_ts = 6969696969;
  oldest_idx = 0;

  constructor(port, ts, digit) {
    this.entry_arr = [[port, ts, digit]];
    this.oldest_ts = ts;
  }

  pretty_print = () => console.log(this.entry_arr);
  add_entry = (port, ts, digit) => {
    if (this.entry_arr.length < 3 && ts < this.oldest_ts) {
      this.entry_arr.push([port, ts, digit]);
      this.oldest_ts = ts;
      this.oldest_idx = entry_arr.length - 1;
    } else if (this.entry_arr.length < 3)
      this.entry_arr.push([port, ts, digit]);
    else if (ts < this.oldest_ts) return;
    else {
      this.oldest_ts = 6969696969;
      this.entry_arr[this.oldest_idx] = [port, ts, digit];

      for (let i = 0; i < this.entry_arr.length; i++)
        if (this.entry_arr[i][1] <= this.oldest_ts) {
          this.oldest_ts = this.entry_arr[i][1];
          this.oldest_idx = i;
        }
    }
  };
};
