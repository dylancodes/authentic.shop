import fs from 'fs';

import Parser from '../libs/multipartParser.js';
import { uploadFile } from '../libs/s3-lib.js';
import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.uploadAttachment = (event, context, callback) => {
  const currentShopAccount = decodeURI(event.pathParameters.shopAccount);
  Parser.parse(event).then(async(result) => {
    const file = `${event.body.shopName}/${result.body.filename}`;
    const type = result.body.contentType;
    const s3_result = await uploadFile(result.body.file, file, type)
    .then(async(s3_data) => {
        try {
          const get_params = {
            TableName: 'Shops',
            Key: {
              shopAccount: currentShopAccount
            }
          }
          const result = await dynamoDBLib.call("get", get_params);
          if(result.Item) {
            const currentImageCollection = (result.Item.s3ImageCollection ? result.Item.s3ImageCollection : []);
            const uploadedImageData = {
              key: s3_data.Key,
              url: s3_data.Location
            }
            currentImageCollection.push(uploadedImageData);

            const update_params = {
              TableName: 'Shops',
              Key: {
                shopAccount: currentShopAccount
              },
              UpdateExpression: 'set #item = :value',
              ExpressionAttributeNames: {
                  "#item": 's3ImageCollection'
              },
              ExpressionAttributeValues: {
                  ":value": currentImageCollection
              }
            }
            await dynamoDBLib.call("update", update_params);
            return uploadedImageData;
          } else {
            throw "Shop not found";
          }
        }
        catch (e) {
          // catches the try statement
          // this runs if anything in the try block fails
          // log to service
          throw e;
        }
      })
      .catch((error) => {
        // catches the uploadFile function
        // this runs if the uploadFile function fails
        // log error to service
        console.log(error);
        throw new Error(error);
      });
    console.log(s3_result);
    callback(null, success({ status: true, s3_result }));
  })
  .catch((err) => {
    // catches the parse function
    console.log(err);
    callback(null, failure({ status: false, error: "Unable to upload file to S3" }));
  });
}
