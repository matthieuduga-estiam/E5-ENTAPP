var AWS = require("aws-sdk")
AWS.config.update({ region: 'eu-west-1' })
const tableName = "dev-todo-matthieu"
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = async (event, context) => {
    let headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    }
    let body
    let statusCode = 200

    let { id, text, status } = JSON.parse(event.body)

    try {
        var params = {
            TableName: tableName,
            Item: {
                'id': { S: "" + id + "" },
                'text': { S: "" + text + "" },
                'status': { N: "" + status + "" }
            }
        }

        await dynamodb.putItem(params).promise()

        body = "Added item with id " + id
    } 
    catch (err) {
        statusCode = 400
        body = err.message
    }

    const response = {
        statusCode,
        headers,
        body
    }
    return response
}
