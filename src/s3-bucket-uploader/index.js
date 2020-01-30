import { config as AWSConfig, S3 } from "aws-sdk";

class S3BucketUploader {
  /**
   * Static properties
   */
  static config = null;

  static setConfigs(config) {
    S3BucketUploader.config = config;
  }

  static getCreds = (url, authToken=null) => {
    return new Promise(async (resolve, reject) => {
      let headers = {};
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
      fetch(url, {
        method: "GET",
        headers
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          resolve(S3BucketUploader.prepareAWSConfigs(res));
        });
    });
  };

  static prepareAWSConfigs = config => {
    return {
      accessKeyId: config.AccessKeyId,
      secretAccessKey: config.SecretAccessKey,
      sessionToken: config.SessionToken,
      S3BucketName: config.S3BucketName,
      S3Region: config.S3Region
    };
  };

  /**
   * Non static properties
   */

  constructor(config) {
    S3BucketUploader.setConfigs(config);
  }

  uploadFile = (file, onComplete, onProgressCallBack = () => {}) => {
    const { config } = S3BucketUploader;
    AWSConfig.update(config);
    // Configure your region
    AWSConfig.region = config.S3Region;
    var bucket = new S3({
      params: {
        Bucket: config.S3BucketName
      }
    });
    const Key = String(+new Date());
    var params = { Key, ContentType: file.type, Body: file };
    bucket
      .upload(params)
      .on("httpUploadProgress", onProgressCallBack)
      .send(onComplete);
  };
}

export default S3BucketUploader;