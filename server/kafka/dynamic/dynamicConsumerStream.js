const fs = require('fs')
const readline = require('readline')
const stream = require('stream')
const path = require('path')
const kafka = require('../kafkaConnection')

let subscriptions = []

async function listenEvents (topics, list, consumer) {
  for (const topic of topics) {
    if (!subscriptions[topic]) {
      await consumer.subscribe({ topic, fromBeginning: false })
      subscriptions.push(topic)
    }
  }
}

function pathListTopic (list = 'default') {
  return `./assets/consumers/${list}.txt`
}

function availableListTopic (list) {
  return fs.existsSync(pathListTopic(list))
}

function loadListTopic (list) {
  return fs
    .readFileSync(pathListTopic(list))
    .toString()
    .split(/[\r\n]+/g)
}

const messageReceiver = async (payload) => {
  const value = payload.message.value ? payload.message.value.toString() : null
  const timestamp = (new Date(Number(payload.message.timestamp))).toISOString()
  const now = (new Date()).toISOString()
  console.log('===================================')
  console.log('>>> Received Topic: ', payload.topic, value, now, `(${timestamp})`)
  console.log('===================================')
}

const runConsumerStream = async function (app) {
  const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUPID || 'dynamic-server'
  })

  await consumer.connect()

  const sub = async function (topic) {
    const now = (new Date()).toISOString()
    const needRestart = subscriptions.length > 0
    if (subscriptions[topic]) {
      console.log('===================================')
      console.log('>>> Listened a Topic: ', topic, now)
      console.log('===================================')
      return { topic, error: 'Already Listened', now }
    } else {
      console.log('===================================')
      console.log('>>> Listening a Topic: ', topic, now)
      console.log('===================================')
      await consumer.stop()
      await consumer.subscribe({ topic, fromBeginning: false })
      await consumer.run({
        eachMessage: messageReceiver
      });
      return { topic, now }
    }
  }
  const consume = async function (list) {
    const now = (new Date()).toISOString()
    if (availableListTopic(list)) {
      const topics = loadListTopic(list)
      console.log('===================================')
      console.log('>>> Listening Topics: ', list, topics, now)
      console.log('===================================')
      await consumer.stop()
      await listenEvents(topics, list, consumer)
      await consumer.run({
        eachMessage: messageReceiver
      });
      return { list, topics, now }
    } else {
      console.log('===================================')
      console.log('>>> LIST TOPICS NOT FOUND: ', list, now)
      console.log('===================================')
      return { list, error: 'LIST NOT FOUND', now }
    }
  }

  return {
    sub,
    consume
  }
}

module.exports = runConsumerStream
