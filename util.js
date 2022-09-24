exports.get_time = () => Math.floor(Date.now() / 1000);

exports.top_three = (arr) => {
  var fst = 0;
  var scd = 0;
  var thd = 0;

  for (i of arr)
    if (i > fst) {
      thd = scd;
      scd = fst;
      fst = i;
    } else if (i > scd) {
      thd = scd;
      scd = i;
    } else if (i > thd) {
      thd = i;
    }
  return [fst, scd, thd];
};
