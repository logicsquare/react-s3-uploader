import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as AWS from "aws-sdk";
import S3BucketUploader from "./s3-bucket-uploader";

class App extends Component {
  state = {
    file: "",
    isUploading: false,
    uploadPercentage: 0
  };

  s3Uploader = null;

  async componentDidMount() {
    const config = await S3BucketUploader.getCreds(
      "https://48f73f27.ngrok.io/awstempcreds"
    );
    //  Initialize S3 Uploader
    this.s3Uploader = new S3BucketUploader(config);
  }

  _updateFile = e => {
    let { file } = this.state;
    if (e && e.target && e.target.files && e.target.files.length) {
      file = e.target.files[0];
      this.setState({ file });
    }
  };

  _uploadFile = () => {
    let { file } = this.state;
    this.s3Uploader.uploadFile(file, this._onComplete, this._onUploadProgress);
  };

  _onUploadProgress = evt => {
    let {uploadPercentage, isUploading} = this.state;
    isUploading = true;
    uploadPercentage = parseInt((evt.loaded * 100) / evt.total) + '%';
    this.setState({ uploadPercentage, isUploading });
  }

  _onComplete = (error, success) => {
    console.log('error, success :', error, success);
  }

  render() {
    const { uploadPercentage, isUploading } = this.state;
    return (
      <>
        <input
          type="file"
          name="file"
          onChange={this._updateFile}
        />
        <button type="button" onClick={this._uploadFile}>
          Upload
        </button>
        {
          isUploading? (
          <p>Upload Progress: {uploadPercentage}</p>
          ): null
        }
      </>
    );
  }
}

export default App;
