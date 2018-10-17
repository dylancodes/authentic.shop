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

const createRequest = async (requestMethod, requestPath, data = null) => {
  this.data = data;
  return await refreshCred().then(() => {
    if(this.data != null) {
      this.request = {
        headers: {
          'Content-Type': 'application/json'
        },
        service: 'execute-api',
        hostname: 'api.authentic.shop',
        region: 'us-east-1',
        data: this.data,
        method: requestMethod,
        url: `https://api.authentic.shop/shops/${requestPath}`,
        path: `/shops/${requestPath}`,
        body: JSON.stringify(this.data)
      }
    } else {
      this.request = {
        service: 'execute-api',
        hostname: 'api.authentic.shop',
        region: 'us-east-1',
        method: requestMethod,
        url: `https://api.authentic.shop/shops/${requestPath}`,
        path: `/shops/${requestPath}`
      }
    }
    this.signedRequest = aws4.sign(this.request,
    {
      accessKeyId: `${AWS.config.credentials.accessKeyId}`,
      secretAccessKey: `${AWS.config.credentials.secretAccessKey}`,
      sessionToken: `${AWS.config.credentials.sessionToken}`
    });
    delete this.signedRequest.headers['Host'];
    delete this.signedRequest.headers['Content-Length'];
    return this.signedRequest;
  }).catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

export const getShopByName = async (shopAccount) => {
  return await createRequest('GET', `/${shopAccount}`)
  .then((signedRequest) => {
    return axios(signedRequest);
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    console.log(err);
  });
}

export const getAllShops = async () => {
  return await createRequest('GET', 'all')
  .then((signedRequest) => {
    return axios(signedRequest);
  })
  .then((response) => {
    return Promise.resolve(response);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const createShop = async (data) => {
  return await createRequest('POST', 'new', data)
  .then((signedRequest) => {
    return axios(signedRequest);
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    console.log(err);
  });
}

export const editShop = async (shopAccount, data) => {
  return await createRequest('PATCH', `edit/${shopAccount}`, data)
  .then((signedRequest) => {
    return axios(signedRequest);
  })
  .then((response) => {
    if(!response.status) {
      console.log(response);
      Promise.reject(response.status);
      return;
    }
    return response;
  })
  .catch((err) => {
    console.log(err);
  });
}

export const deleteShop = async(shopAccount) => {
  return await createRequest('DELETE', `delete/${shopAccount}`)
  .then((signedRequest) => {
    return axios(signedRequest);
  })
  .then((response) => {
    if(!response.status) {
      console.log(response);
      Promise.reject(response.status);
      return;
    }
    return response;
  })
  .catch((err) => {
    console.log(err);
  });
}
