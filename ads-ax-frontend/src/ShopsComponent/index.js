import React, { Component } from 'react';
import AWS from 'aws-sdk';

import { checkAuthFn } from '../utils/authUtility.js';
import { getAllShops, createShop, editShop, deleteShop, uploadAttachment } from '../utils/api/shopsUtility.js';

import ShopPage from './ShopsComponent.js';
import ErrorBoundary from '../_components/ErrorBoundary.js';

import { AuthConsumer } from '../_contexts/authContext.js';

export const ImageCollectionCtx = React.createContext();

class ImageCollectionProvider extends Component {
  render() {
    const ctx_value = {
      chooseFileFn: this.props.chooseFileFn
    }
    return (
      <ImageCollectionCtx.Provider value={ctx_value}>
        {this.props.children}
      </ImageCollectionCtx.Provider>
    )
  }
}

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      s3ImageCollection: []
    }
    this.checkAuth();
    this.getAll();
  }

  checkAuth = () => {
    // try/catch
    const authStatus = checkAuthFn();
    if(authStatus && AWS.config.credentials != null) {
      // do nothing
    } else {
      this.props.history.push('/');
    }
  }

  getAll = () => {
    if(this.state.items === null) {
      getAllShops().then((result) => {
        this.setState({
          items: result.data,
          s3ImageCollection: result.data.s3ImageCollection
        });
      })
      .catch((err) => {
        console.log(err);
        // handle err
      });
    }
  }

  addShop = (params) => {
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
    createShop(data)
    .then((result) => {
      this.setState(previousState => ({
        items: [...previousState.items, result.data]
      }));
    })
    .catch((err) => {
      console.log(err);
      // handle err
    })
  }

  changeShop = (shopAccount, params) => {
    // what is the resolve/reject used for??
    return new Promise((resolve, reject) => {
      const data = {
        item: params.item,
        value: params.value
      };
      editShop(shopAccount, data)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
        // handle err
      })
    });
  }

  removeShop = (shopAccount) => {
    return new Promise((resolve, reject) => {
      deleteShop(shopAccount)
      .then((result) => {
        this.setState(prevState => ({
          items: prevState.items.filter(shop => {
            return shop.shopAccount !== shopAccount
          })
        }));
        resolve(this.state.items);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  chooseFileFn = async (fileObj, shopAccount) => {
    uploadAttachment(shopAccount, fileObj)
    .then((result) => {
      // pass down result to appropriate component
      console.log(result);
    })
    .catch((err) => {
      // log to service
      console.log("chooseFileFn errrrror");
      console.log(err);
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <ImageCollectionProvider chooseFileFn={this.chooseFileFn}>
          <div className="adbc-body">
            {this.state.items ? <ShopPage items={this.state.items} addShop={this.addShop} changeShop={this.changeShop} removeShop={this.removeShop} /> : <div><h1>Loading...</h1></div>}
          </div>
        </ImageCollectionProvider>
      </ErrorBoundary>
    );
  }
}

export default ShopsContainer;
