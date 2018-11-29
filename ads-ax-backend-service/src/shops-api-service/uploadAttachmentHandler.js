import Parser from '../libs/multipartParser.js';
import fs from 'fs';
import { uploadFile } from '../libs/s3-lib.js';
import { success, failure } from '../libs/response-lib.js';

module.exports.uploadAttachment = (event, context, callback) => {
  Parser.parse(event).then(async(result) => {
    const file = `${event.body.shopName}/${result.body.filename}`;
    const type = result.body.contentType;
    const s3Data = await uploadFile(result.body.file, file, type);
    callback(null, success({ status: true, key: s3Data.Key }));
  })
  .catch((err) => {
    console.log(err);
    callback(null, failure({ status: false, error: "Unable to upload file to S3" }));
  });
}
