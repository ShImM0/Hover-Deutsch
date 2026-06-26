const { parseQuery } = require("./parser");

const response = require("./response.json");

console.dir(parseQuery(response), { depth: null });