import axios from 'axios';
import aws4 from 'aws4';
import AWS from 'aws-sdk';

const refreshCred = () => {
  return new Promise((resolve, reject) => {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials.get((err) => {
      if(err) {
        // log to service
        console.log(err);
        reject(err);
      } else {
        console.log("credentials refreshed");
        resolve();
      }
    });
  });
}

const createRequest = async (requestMethod, requestPath, data = null, contentType = 'application/json') => {
  this.data = data;
  return await refreshCred().then(() => {
    if(this.data != null) {
      this.request = {
        headers: {
          'Content-Type': contentType
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
    }
    else {
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
    // log to service
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
    // log to service
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
    // log to service
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
    // log to service
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
    // log to service
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
      // return;
    }
    return response;
  })
  .catch((err) => {
    // log to service
    console.log(err);
  });
}


export const uploadAttachment = async(shopAccount, fileObj) => {

  return await createRequest('POST', `upload/${shopAccount}`, fileObj)
  .then((signedRequest) => {
    console.log(signedRequest);
    return axios(signedRequest);
  })
  .then((response) => {
    if(!response.status) {
      console.log(response);
      Promise.reject(response.status);
      // return
    }
    return response;
  })
  .catch((err) => {
    // log to service
    console.log(err);
  });
}

// else if(this.data != null && contentType !== 'application/json') {
//   this.request = {
//     headers: {
//       'Content-Type': contentType
//     },
//     service: 'execute-api',
//     hostname: 'api.authentic.shop',
//     region: 'us-east-1',
//     data: this.data,
//     method: requestMethod,
//     url: `https://api.authentic.shop/shops/${requestPath}`,
//     path: `/shops/${requestPath}`,
//     body: this.data
//   }
// }


// 'multipart/form-data; boundary=AaB03x'
