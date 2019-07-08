"use strict";
const handlers = module.exports = {};

handlers.openConnection = async ( event, context ) => {
    console.log( "Connected Successfully!" );
    return {
        statusCode: 200,
        body: JSON.stringify( {
            message: "Welcome to awesome Serverless Websockets World!",
            input: event,
        } ),
    };
};

handlers.closeConnection = async ( event, context ) => {
    console.log( "disconnected Successfully!" );

    return {
        statusCode: 200,
        body: JSON.stringify( {
            message: "Goodbye! Serverless Websockets World!",
            input: event,
        } ),
    };
};

handlers.defaultHandler = async ( event, context ) => {
    console.log( "defaultHandler!", event );

    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const connectionId = event.requestContext.connectionId;
    const callbackUrlForAWS = util.format( util.format( "https://%s/%s", domain, stage ) ); //construct the needed url
    await sendMessageToClient( callbackUrlForAWS, connectionId, event );

    return {
        statusCode: 200,
    };
};
const sendMessageToClient = ( url, connectionId, payload ) => new Promise( ( resolve, reject ) => {
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi(
        { apiVersion: "2029", endpoint: url } );
    apigatewaymanagementapi.postToConnection( {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify( payload ),
    }, ( err, data ) => {
        if ( err ) {
            console.log( "err is", err );
            reject( err );
        }
        resolve( data );
    } );
} );


