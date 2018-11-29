import AWS from 'aws-sdk';

AWS.config.update({ region: "us-east-1" });

export const uploadFile = (buffer, name, type) => {
  const s3 = new AWS.S3();
  
  const params = {
    Body: buffer,
    Bucket: 'ads-ax-service.shops--zine',
    ContentType: type,
    Key: `${name}`
  };
  return s3.upload(params).promise();
}
