# MUON

## Required Features

- Users can go to page and write a post.
- Users should be able to comment on a post 
- Comments can be edited or deleted. Posts cannot be deleted. 
- Comments should support nesting (with collapse/expand functionality) 

## Technologies

- React JS
- Typescript
- Node JS
- Express
- ESM


## Requirements and Installation

To install and run this project you would need to have installed:
- Node Js
- Git
- Clone the backend and run with the commands below

To run backend:
```
$ git clone https://github.com/jiokeokwuosa/muon-backend.git or use the local copy
$ cd muon-backend
$ npm install
$ npm run dev
```
To run frontend:
```
$ git clone https://github.com/jiokeokwuosa/muon-frontend.git or use the local copy
$ cd muon-frontend
$ npm install
$ npm start
```
## AWS Hosting Steps on EC2

 - Create account on aws
 - Launch an EC2 instance
 - SSH into your instance
 - Install Node.js
 - Install Git and clone repository from GitHub
 - Start the node.js app
 - Keep App running using Pm2

## Testing

```
$ none
```

## Pivotal Tracker stories

None

## Template UI

None

## API

The API is currently in version 1 (v1) and can be accessed locally via [http://localhost:5000/api/v1](http://localhost:5000/api/vi)

## API Documentation Link

None

## API Endpoints

| Endpoint                                         | Functionality                            |
| ------------------------------------------------ | -----------------------------------------|
| POST /baseURL/article/           | Create an article                          |
| POST /baseURL/article/comment   | Comment on an article                         |
| GET /baseURL/article/           | Get a list of the articles                             |
| PATCH /baseURL/article/comment/:commentId   | Update a comment                           |
| DELETE /baseURL/article/comment/:commentId   | Delete a comment                         |


## Author

Okwuosa Chijioke (Okwuosachijioke@gmail.com)

## License

This is licensed for your use, modification and distribution under the [MIT license.](https://opensource.org/licenses/MIT)

## My Env Variables for Backend
NODE_ENV=development
PORT=5000
ATLAS_URL=mongodb+srv://jiokeokwuosa:jiokeokwuosa@chijiokedb-hepo3.mongodb.net/test?retryWrites=true&w=majority
SECRET=muonsecret
