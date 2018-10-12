import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.deleteShop = async (event, context, callback) => {
  const params = {
    TableName: "Shops",
    Key: {
      shopAccount: decodeURI(event.pathParameters.shopAccount)
    }
  }

  try {
    await dynamoDBLib.call("delete", params);
    callback(null, success({ status: true }));
  } catch(e) {
    //console.log(e);
    callback(null, failure({ status: false, error: "Unable to delete item"}));
  }
}
