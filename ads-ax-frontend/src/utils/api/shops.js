import axios from 'axios';
import aws4 from 'aws4';
import AWS from 'aws-sdk';
import { userFn } from '../auth.js';


const refreshCred = () => {
  return new Promise((resolve, reject) => {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials.get((err) => {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        console.log("credentials refreshed");
        resolve();
      }
    });
  });
}

export const getAllShops = async () => {
  const signedRequest = await refreshCred().then(() => {
    let request = {
      service: 'execute-api',
      hostname: 'api.authentic.shop',
      region: 'us-east-1',
      method: 'GET',
      url: 'https://api.authentic.shop/shops/all',
      path: '/shops/all'
    }
    let sr = aws4.sign(request,
    {
      accessKeyId: `${AWS.config.credentials.accessKeyId}`,
      secretAccessKey: `${AWS.config.credentials.secretAccessKey}`,
      sessionToken: `${AWS.config.credentials.sessionToken}`
    });
    delete sr.headers['Host'];
    delete sr.headers['Content-Length'];
    return sr;
  }).catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
  let response = await axios(signedRequest).then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
  return Promise.resolve(response);
}

export const createShop = async (params) => {
  const signedRequest = await refreshCred().then(() => {
    const data = {
      shopAccount: params.shopAccount,
      displayName: params.displayName,
      hq: params.hq,
      description: params.description,
      contact: {
        email: params.contact.email,
        name: params.contact.name,
        phone: params.contact.phone,
        title: params.contact.title
      },
      attachments: params.attachments
    };
    let request = {
      headers: {
        'Content-Type': 'application/json'
      },
      service: 'execute-api',
      hostname: 'api.authentic.shop',
      region: 'us-east-1',
      data,
      method: 'POST',
      url: 'https://api.authentic.shop/shops/new-shop',
      path: '/shops/new-shop',
      body: JSON.stringify(data)
    }
    let sr = aws4.sign(request,
    {
      accessKeyId: `${AWS.config.credentials.accessKeyId}`,
      secretAccessKey: `${AWS.config.credentials.secretAccessKey}`,
      sessionToken: `${AWS.config.credentials.sessionToken}`
    });
    delete sr.headers['Host'];
    delete sr.headers['Content-Length'];
    return sr;
  }).catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
  let response = await axios(signedRequest).then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
  return Promise.resolve(response);
}
