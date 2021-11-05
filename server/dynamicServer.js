const express = require("express");
const runDynamicStream = require("./kafka/dynamic/dynamicStream");
const fs = require("fs");

const app = express();

// Modularize dynamic streaming data functionality
// Consumes and produces events to specified Kafka broker
runDynamicStream(app);

// Listens on port
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
