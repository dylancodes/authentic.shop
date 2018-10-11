import uuid from "uuid";
import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.createShop = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Shops",
    Item: {
      shopAccount: data.shopAccount,
      displayName: data.displayName,
      shopId: uuid.v1(),
      description: data.description,
      hq: data.hq,
      contact: {
        name: data.contact.name,
        title: data.contact.title,
        phone: data.contact.phone,
        email: data.contact.email
      },
      attachments: data.attachments,
      createdBy: event.requestContext.identity.cognitoIdentityId,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDBLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    // console.log(e);
    callback(null, failure({ status: false }));
  }
}
