# Upload With Nodejs

upload any files with Nodejs 

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/carmast/tasks.git
```


2. Install dependencies:
 Open your Terminal and run :
 1.
```js
 yarn install
```
2.
```js
 yarn build
```
 
3. Set up environment variables:Create a .env file in the root directory and add the following variables:
```js
JWT_SEC=your_jwt_secret
PASS_SEC=your_password_secret
```
## Run Project 
Open your Terminal and run :
  ```js  
   yarn dev
   ``` 
   OR
  ```js 
   yarn start  
```


## For API Endpoint (Swagger) Docs
  
```bash
 http://localhost:8080/docs/
```

## For Prisma DB  
1. add prisma with yarn on global 
 ```js
 yarn global add prisma 
 ```
2. 
1.if add new  model or change somthing in prisma.schema run this :
 ```js
 prisma generate 
 ``` 
2. after push models on db  
```js
  prisma push db 
```

## For prisma Migration 

```js
prisma migrate dev  --name  YourNameMigrate
```
