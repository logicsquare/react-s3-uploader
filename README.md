# Upload files directly to S3 bucket from REACT project

![](https://thumbs.gfycat.com/IllegalInsistentArmednylonshrimp-size_restricted.gif)

### Get started

#### 1. Import `S3BucketUploader` 
```
import S3BucketUploader from "./s3-bucket-uploader";

```

#### 2. Initialize S3BucketUploader and pass configs  
```
this.s3Uploader = new S3BucketUploader(config);

```

#### 3. Configs should be in this format
```
{
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '',
  S3BucketName: '',
  S3Region: ''
}
```