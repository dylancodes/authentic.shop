import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.editShop = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'Shops',
    Key: {
      shopAccount: event.pathParameters.shopAccount
    },
    UpdateExpression: 'set #path = :value',
    ExpressionAttributeNames: {
        "#path": data.path
    },
    ExpressionAttributeValues: {
        ":value": data.value
    }
  };

  try {
    // if item does not exist, the item is created with the given attributes
    await dynamoDBLib.call("update", params);
    callback(null, success({status: true, resource: `api.authentic.shop/v1/shops/${params.Key.shopAccount}`}));
  } catch (e) {
    // console.log(e);
    callback(null, failure({ status: false, error: "Unable to update item" }));
  }
};
