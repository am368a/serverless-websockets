const WS = require('ws');
const client = new WS('http://localhost:3000/v1/functions/serverless-websockets-dev-connectionHandler/invocations');
client.on('$connect', (data)=>{
    console.log('Connected', data);
    //client.send('Hello from WS Client');
});

client.on('error', (err)=>{
    console.log('WSError', err);
   // client.send('Good Bye from WS Client');
});

client.on('close', ()=>{
    client.send('Good Bye from WS Client');
});
