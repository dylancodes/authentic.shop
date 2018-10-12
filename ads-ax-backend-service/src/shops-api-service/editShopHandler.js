import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.editShop = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'Shops',
    Key: {
      shopAccount: decodeURI(event.pathParameters.shopAccount)
    },
    UpdateExpression: 'set #item = :value',
    ExpressionAttributeNames: {
        "#item": data.item
    },
    ExpressionAttributeValues: {
        ":value": data.value
    }
  };

  try {
    // if item does not exist, the item is created with the given attributes
    await dynamoDBLib.call("update", params);
    const shopAccount = encodeURI(params.Key.shopAccount);
    callback(null, success({status: true, resource: `https://api.authentic.shop/shops/${shopAccount}`}));
  } catch (e) {
    // console.log(e);
    callback(null, failure({ status: false, error: "Unable to update item" }));
  }
};
