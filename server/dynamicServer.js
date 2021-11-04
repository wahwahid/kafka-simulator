const express = require("express");
const runDynamicStream = require("./kafka/dynamic/dynamicStream");
const fs = require("fs");

const app = express();

// Modularize dynamic streaming data functionality
// Consumes and produces events to specified Kafka broker
runDynamicStream(app);

// Listens on port 3001
app.listen(3001, () => {
  console.log("Listening on 3001");
});
