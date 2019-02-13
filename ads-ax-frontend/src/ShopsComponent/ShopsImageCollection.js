import React, { Component } from 'react';

import ShopsImageItem from './ShopsImageItem';
import { ImageCollectionCtx } from './index.js';

class ShopsImageCollection extends Component {
  constructor(props) {
    super(props);
    this.state ={
      imageName: null,
      fileObj: null
    }
    console.log(props.shopAccount);
  }

  handleFileChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ imageName: file.name });

    const result = {
      name: file.name,
      type: file.type
    };

    let ready = false;

    const check = () => {
        if (ready === true) {
          this.setState({ fileObj: result });
          return;
        }
        setTimeout(check, 1000);
    }

    check();

    const reader = new FileReader();

    reader.onloadend = function(e) {
        const arrayBuffer = e.target.result;
        const uint8View = new Uint8Array(arrayBuffer);
        result.fileArray = uint8View;
        ready = true;
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <ImageCollectionCtx.Consumer>
        {({chooseFileFn}) => {
          const selectFile = async (e) => {
            e.preventDefault();
            await chooseFileFn(this.state.fileObj, this.props.shopAccount);
          }
          return (
            <div>
            <form onSubmit={selectFile} encType="multipart/form-data">
              <h5>Attachments</h5>
              <label className="input-label" htmlFor="file">{this.state.imageName ? this.state.imageName : 'Add an Image'}</label>
              <input type="file" name="file" id="file" className="addimage-input" onChange={this.handleFileChange}/>
              <input type="submit" className="addimage-submit" value="Submit" />
            </form>
            {this.props.s3ImageCollection ? this.props.s3ImageCollection.map((image_item) => {
              return (<ShopsImageItem key={image_item.key} image={image_item} />);
            }) : <React.Fragment/>}
            </div>
          );
        }
      }
      </ImageCollectionCtx.Consumer>
    );
  }
}

export default ShopsImageCollection;
