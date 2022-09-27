const { Table } = require("./Table.js");
const { Entry } = require("./Entry.js");

let t = new Table();
t.add_entry("42.42.42.42", "2333", 103, 2);
t.add_entry("42.42.42.42", "2334", 104, 2);
t.add_entry("42.42.42.42", "2335", 105, 2);
t.add_entry("42.42.42.42", "2336", 106, 2);
t.add_entry("42.42.42.42", "2333", 103, 2);
t.add_entry("42.42.42.42", "2333", 103, 2);
t.add_entry("42.42.42.42", "2336", 109, 6);

t.pretty_print();

let e = new Entry("2333", 100, 2);
//e.pretty_print();
