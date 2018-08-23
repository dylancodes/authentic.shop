const AWSConfig = {
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_C0HNsNxHX',
    APP_CLIENT_ID: '57ct91u0vumgokp1fa12lhqfaf',
    IDENTITY_POOL_ID: 'us-east-1:35129557-2348-408c-ae5d-5f5437ea93b1'
  }
};

export default AWSConfig;

const AWS = require('aws-sdk');
AWS.config.region = AWSConfig.cognito.REGION;
