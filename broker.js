const port = 1883
const wsPort = 8883

const aedes = require('aedes')({

    // persistence: mongoPersistence({
    //     url: 'mongodb://127.0.0.1/aedes-test',
    //     // Optional ttl settings
    //     ttl: {
    //         packets: 300, // Number of seconds
    //         subscriptions: 300
    //     }
    // }),
    // authenticate: (client, username, password, callback) => {



    // },
    // authorizePublish: (client, packet, callback) => {

    // },

    // authorizeSubscribe: (client, packet, callback) => {

    // }
});

const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
ws.createServer({ server: httpServer }, aedes.handle)

server.listen(port, function() {
    console.log('Ades MQTT Listening on port ' + port)
    // Logger.debug('Ades MQTT listening on port: ' + port)
})

httpServer.listen(wsPort, function () {
    // Logger.debug('Aedes MQTT-WS listening on port: ' + wsPort)
    
    aedes.publish({ topic: 'sensor/data', payload: "I'm broker " + aedes.id })
    console.log('Aedes MQTT-WS Listening on port: '+wsPort)
});
