const readline = require("readline");
const runConsumerStream = require("./dynamicConsumerStream")
const runProducerStream = require("./dynamicProducerStream")

// Establish and connect a Kafka producer and consumer, then interact with commandline
const runDynamicStream = async function (app) {
  const { pub, produce } = await runProducerStream(app)
  const { sub, consume } = await runConsumerStream(app)

  const handlers = {
    pub,
    produce,
    sub,
    consume
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // rl.on runs everytime a new line is read, each line being a new review object with complete information
  // pertaining to a single review
  rl.on("line", (line) => {
    const args = line.split(' ')
    const command = args[0]
    const value = args[1]
    const payload = args[2] || null
    if (handlers[command]) {
      handlers[command](value, payload)
    }
  });

  app.get('/:command/:value', async function (req, res) {
    const { command, value } = req.params
    const payload = req.query.payload || null
    if (handlers[command]) {
      const result = await handlers[command](value, payload)
      res.send(result)
    } else {
      res.status(404).send('COMMAND NOT FOUND')
    }
  })
};

module.exports = runDynamicStream;
