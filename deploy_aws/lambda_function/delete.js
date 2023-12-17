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

    let id = event.pathParameters.id

    try {
        var params = {
            TableName: tableName,
            Key: {
                'id': { S: "" + id + "" },
            }
        }

        await dynamodb.deleteItem(params).promise()

        body = "Deleted item with id " + id
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
