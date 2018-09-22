import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.getShopByName = async (event, context, callback) => {
  const params = {
    TableName: 'Shops',
    Key: {
      shopAccount: event.pathParameters.shopAccount
    }
  };

  try {
    const result = await dynamoDBLib.call("get", params);
    if(result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Shop not found" }));
    }
  } catch (e) {
    // console.log(e)
    callback(null, failure({ status: false }));
  }
}

module.exports.getAllShops = async (event, context, callback) => {
  const params = { TableName: "Shops" };
  try {
    const result = await dynamoDBLib.call('scan', params);
    let tempResults = {};
    while(result.LastEvaluatedKey || tempResults.LastEvaluatedKey) {
      params['ExclusiveStartKey'] = result.LastEvaluatedKey;
      tempResults = await dynamoDBLib.call('scan', params);
      result.Items.push(tempResults);
    }
    callback(null, success(result.Items));
  } catch (e) {
    // console.log(e);
    callback(null, failure({status: false}));
  }
}
