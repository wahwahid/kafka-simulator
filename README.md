# kafka-simulator

A Kafka simulation app for learning Kafka.

So you'd like to learn about Kafka but you aren't sure where to start? kafka-simulator is meant to provide an easy-to-use Kafka simulation environment to get you creating messages to partitions in no-time!

## Motivation

There are many moving parts with a Kafka cluster, which creates high barriers of entry. We wanted to develop a solution to fix this problem. With kafka-simulator, you can get a Kafka simulation environment up and running very quickly with little to no configuration required.

## Guides

The following guides will walk you through starting dynamic kafka topic.

### Pre-configured Topic Guide
#### Consumers (Prepared Batch Sub)
Create .txt file in directory `assets/consumers`. The name of file will be the name of prepared consumer list. Write the name of topics in each line of the file. Please see `assets/consumers/default.txt` for example.
#### Producers (Prepared Payload Pub)
Create .json file in directory `assets/producers`. The name of file will be the name of prepared topic event. Write the value/payload of topic message in the file. Please see `assets/producers/my-first-topic.json` for example.

### Configue The App
You can change the environment variable from its default value
```env
PORT=3001
KAFKA_BROKER="localhost:9092"
KAFKA_CLIENTID="dynamic"
KAFKA_GROUPID="dynamic-server"
```

### Running The App
```bash
# install dependencies
npm install

# run development mode
npm run dev

#run production mode
npm run start
```

### Commands
#### Consuming Prepared Batch Sub (Consume)
```bash
#pattern
consume {listname}

#example
consume default
```

#### Producing Prepared Payload Pub (Produce)
```bash
#pattern
produce {topic}

#example
produce my-first-topic
```

#### Consuming (Sub)
```bash
#pattern
sub {topic}

#example
sub my-thrid-topic
```

#### Producing (Pub)
```bash
#pattern
pub {topic} {message-value}

#example
pub my-second-topic Hey
pub my-second-topic {"hey":"Bro"}
```

### REST APIs
#### Consuming Prepared Batch Sub (Consume)
```php
#pattern
[GET] /consume/{listname}

#example
[GET] /consume/default
```

#### Producing Prepared Payload Pub (Produce)
```php
#pattern
[GET] /produce/{topic}

#example
[GET] /produce/my-first-topic
```

#### Consuming (Sub)
```php
#pattern
[GET] /sub/{topic}

#example
[GET] /sub/my-thrid-topic
```

#### Producing (Pub)
```php
#pattern
[GET] /pub/{topic}?payload={message-value}

#example
[GET] /pub/my-second-topic?payload=Hey
[GET] /pub/my-second-topic?payload={"hey":"Bro"}
```

## Contributors
[wahwahid](https://github.com/wahwahid),

## [oslabs-beta/kafka-simulator](https://github.com/oslabs-beta/kafka-simulator) Contributors

[Joe Kinney](https://github.com/joekinney-png),
[Jonah Stewart](https://github.com/jonahlstewart),
[Keon Kim](https://github.com/Keon-Kim-0),
[Mark Miller](https://github.com/markmanuelmiller),
[Tobi-Wan Rhodes](https://github.com/rtobiwan)
