import { uploadFile } from '../libs/s3-lib.js';
import * as dynamoDBLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';

const parseImage = (image_array) => {
  const arr = [];
  for(let i in Object.getOwnPropertyNames(image_array)) {
      arr[i] = image_array[i];
  }
  return Buffer.from(new Uint8Array(arr));
}

module.exports.uploadAttachment = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const currentShopAccount = decodeURI(event.pathParameters.shopAccount);

  try {
    const image_name = `${currentShopAccount}/${data.name}`;
    const image_type = data.type;
    const image_array = data.fileArray;

    const image_body = await parseImage(image_array);

    const s3Data = await uploadFile(image_body, image_name, image_type);

    const get_params = {
      TableName: 'Shops',
      Key: {
        shopAccount: currentShopAccount
      }
    };

    const dynamoGet_result = await dynamoDBLib.call("get", get_params);

    if(dynamoGet_result.Item) {
      const currentImageCollection = dynamoGet_result.Item.s3ImageCollection;

      const uploadedImageData = {
        key: s3Data.Key,
        url: s3Data.Location
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

      callback(null, success({ status: true, uploadedImageData }));
    } else {
      throw new Error("Shop not found");
    }
  }
  catch(err) {
    // log to service
    console.log(err);
    callback(null, failure({ status: false, error: "Unable to upload file to S3" }));
  }
};
