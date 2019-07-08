var Socket = require('simple-websocket')

var socket = new Socket('http://localhost:3000/v1/functions/serverless-websockets-dev-connectionHandler/invocations\'');
socket.on('connect', function () {
    // socket is connected!
    socket.send('sup!')
})

socket.on('data', function (data) {
    console.log('got message: ' + data)
})
