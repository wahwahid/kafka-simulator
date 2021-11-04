const { Kafka, logLevel } = require('kafkajs');

let clientId = process.env.KAFKA_CLIENTID || process.env.stream || 'dynamic';

// Invoked to create a new connection to a Kafka instance using KafkaJS node package
const kafka = new Kafka({
  clientId,
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  logLevel: logLevel.INFO
});

module.exports = kafka;
