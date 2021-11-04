const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const path = require('path')
const kafka = require('../kafkaConnection')

async function sendEvent (review, topic, producer) {
  await producer.send({
    topic,
    messages: [{ value: review }]
  })
}

function pathMockTopic (topic) {
  return `./assets/producers/${topic}.json`
}

function availableMockTopic (topic) {
  return fs.existsSync(pathMockTopic(topic))
}

function loadMockTopic (topic) {
  return fs.readFileSync(pathMockTopic(topic)).toString()
}

const runProducerStream = async function (app) {
  const producer = kafka.producer()
  await producer.connect()

  const pub = async function (topic, payload) {
    const now = (new Date()).toISOString()
    console.log('===================================')
    console.log('>>> Sending Topic: ', topic, payload, now)
    console.log('===================================')
    await sendEvent(payload, topic, producer)
    return { topic, payload, now }
  }
  const produce = async function (topic) {
    const now = (new Date()).toISOString()
    if (availableMockTopic(topic)) {
      const payload = loadMockTopic(topic)
      console.log('===================================')
      console.log('>>> Sending Topic: ', topic, payload, now)
      console.log('===================================')
      await sendEvent(payload, topic, producer)
      return { topic, payload, now }
    } else {
      console.log('===================================')
      console.log('>>> MOCK TOPIC NOT FOUND: ', topic, now)
      console.log('===================================')
      return { topic, error: 'MOCK NOT FOUND', now }
    }
  }
  return { pub, produce }
}

module.exports = runProducerStream
