const AWS = require('aws-sdk');
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
var jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
    console.log(JSON.stringify(event.headers));
    let body = event.body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    };
    
    let secret = "set your secret here";
    try {
      var decoded = jwt.verify(event.headers['authorization'].split(" ")[1], secret);
    } catch(err) {
      return {
            statusCode: 401,
            event,
            body: JSON.stringify({error: 'Unauthorized'}),
            headers
        };
    }

    try {
        const { recipient, body, sender } = JSON.parse(event.body);
        const params = {
            Message: `${body}`,
            PhoneNumber: `${recipient}`
        }
        const result = await sns.publish(params).promise();
        const final_response = {
            statusCode:200,
            body:'Success'
        };
        return final_response;
        
    } catch (error) {
        body = error.message;
        const final_response = {
            statusCode:400,
            body
        };
        return final_response;
    } 
};