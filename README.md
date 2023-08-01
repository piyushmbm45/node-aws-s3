# node-aws-s3

## About
 This project provide a boiler plate code for apis related to files and bucket of aws-s3 via nodejs. Apis related to files crud operation and bucket listing

## Local Setup
- clone the repo 
```shell
git clone https://github.com/piyushmbm45/node-aws-s3.git
```
- setup all environment variables listed in ```.env.example``` file
- By default apis uses user provided path to do crud operation of files in bucket but if path is not provided in apis then S3_PATH is used.
- install all dependency
```shell 
npm i
```
- start the server
```shell
node main.js
``` 
- or
```shell 
nodemon main.js
```

## Apis Available
| Api          | Type   | form                                     |
| ------------ | ------ | ---------------------------------------- |
| /file/single | get    | {folder_path: '', file_name: ''}         |
| /file/single | post   | {folder_path: '', files: array of files} |
| /file/single | delete | {folder_path: '', file_name: ''}         |
| /file/all    | get    | not required                             |
| /bucket/list | get    | not required                             |

## Further Opportunity
- bucket crud
- https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html
- add server side rendering html

## Thanks
- Show some love by Starring my repo