# YouTube_custom_Backend

## Live Demo

Here is the link to the live demo of the YouTube_(custom) application:
[YouTube custom Backend](https://youtube-custom-backend.onrender.com)

## Description

This is a video sharing platform inspired by YouTube,
featuring user registration, authentication, and video management functionalities in <b>Backend</b>.
This project is a simple, yet functional, video sharing application that mimics the core features of YouTube.
It includes user registration, login, video upload, profile management functionalities and many more.
The backend of the application is built using Node.js, Express, and MongoDB.
It provides a RESTful API for managing users, videos, and other related resources.

## Table of Contents
- [Data Model](#data-model)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Postman API Documentation](#postman-api-documentation)
  - [Healthcheck Controller](#healthcheck-controller)
  - [User Controller](#user-controller)
    - [Endpoint - `myURL/api/v1/users/register`](#endpoint---myurlapi-v1usersregister)

- [Assignment 1 - Test the remaining endpoints of User Controller APIs using Postman](#assignment-1---test-the-remaining-endpoints-of-user-controller-apis-using-postman)
  - [Endpoint - `myURL/api/v1/users/register`](#endpoint---myurlapi-v1usersregister)
  - [Endpoint - `myURL/api/v1/users/login`](#endpoint---myurlapi-v1userslogin)
  - [Endpoint - `myURL/api/v1/users/logout`](#endpoint---myurlapi-v1userslogout)
  - [Endpoint - `myURL/api/v1/users/refresh-token`](#endpoint---myurlapi-v1usersrefresh-token)
  - [Endpoint - `myURL/api/v1/users/change-password`](#endpoint---myurlapi-v1userschange-password)
  - [Endpoint - `myURL/api/v1/users/current-user`](#endpoint---myurlapi-v1userscurrent-user)
  - [Endpoint - `myURL/api/v1/users/update-account`](#endpoint---myurlapi-v1usersupdate-account)
  - [Endpoint - `myURL/api/v1/users/avatar`](#endpoint---myurlapi-v1usersavatar)
  - [Endpoint - `myURL/api/v1/users/cover-image`](#endpoint---myurlapi-v1userscover-image)
  - [Endpoint - `myURL/api/v1/users/channel/:username`](#endpoint---myurlapi-v1userschannelusername)
  - [Endpoint - `myURL/api/v1/users/history`](#endpoint---myurlapi-v1usershistory)
  
- [Assignment 2 - Develop more controllers and routes for the YouTube custom Backend application](#assignment-2---develop-more-controllers-and-routes-for-the-youtube-custom-backend-application)
  - [Updated File Structure](#updated-file-structure)
  - [Video Controller](#video-controller)
  - [Playlist Controller](#playlist-controller)
  - [Subscription Controller](#subscription-controller)
  - [Comment Controller](#comment-controller)
  - [Tweet Controller](#tweet-controller)
  - [Like Controller](#like-controller)

## Data Model
Here is the link to the data model of the YouTube_(custom) application:
[Data Model](https://app.eraser.io/workspace/Glfyb7q3zdi9q8fYEccc?origin=share)

## Technologies Used

| Dependencies | Version | Installation Command | License | Usage |
| :---: | :---: | :---: | :---: | :---: |
| bcrypt | 6.0.0 | `npm i bcrypt` | MIT | Used for hashing passwords securely. |
| cloudinary | 2.7.0 | `npm i cloudinary` | MIT | Cloud storage service for storing images and files. |
| cookie-parser | 1.4.7 | `npm i cookie-parser` | MIT | Middleware for parsing cookies in requests. |
| cors | 2.8.5 | `npm i cors` | MIT | Middleware for enabling CORS (Cross-Origin Resource Sharing). |
| dotenv | 17.0.1 | `npm i dotenv` | BSD-2-Clause | Loads environment variables from a .env file. |
| express | 5.1.0 | `npm i express` | MIT | Web framework for building APIs and web applications. |
| jsonwebtoken | 9.0.2 | `npm i jsonwebtoken` | MIT | Library for creating and verifying JSON Web Tokens (JWT). |
| mongoose | 8.16.1 | `npm i mongoose` | MIT | ODM (Object Data Modeling) library for MongoDB and Node.js. |
| mongoose-aggregate-paginate-v2 | 1.1.4 | `npm i mongoose-aggregate-paginate-v2` | MIT | Plugin for pagination of MongoDB aggregation queries. |
| multer | 2.0.1 | `npm i multer` | MIT | Middleware for handling multipart/form-data, used for file uploads. |

| Dev Dependencies | Version | Installation Command | Run Command | License | Usage |
| :---: | :---: | :---: | :---: | :---: | :---: |
| nodemon | 3.1.10 | `npm i nodemon` | `npm run dev` | MIT | Development tool for automatically restarting the server on file changes. |
| prettier | 3.6.2 | `npm i prettier` | `npm run format` | MIT | Code formatter for maintaining consistent code style. |

## File Structure
 
```bash
YouTube_(custom)/
│   .env
│   .prettierignore
│   .prettierrc
│   package-lock.json
│   package.json
│   README.md
│   
├───node_modules/
├───public/
│   └───temp/
└───src/
    │   app.js
    │   constants.js
    │   index.js
    │   
    ├───controllers/
    │       healthcheck.controllers.js
    │       user.controllers.js
    │       
    ├───db/
    │       index.js
    │       
    ├───middlewares/
    │       auth.middlewares.js
    │       multer.middlewares.js
    │       
    ├───models/
    │       comment.models.js
    │       like.models.js
    │       playlist.models.js
    │       subscription.models.js
    │       tweet.models.js
    │       user.models.js
    │       video.models.js
    │       
    ├───routes/
    │       healthcheck.routes.js
    │       user.routes.js
    │       
    └───utils/
            apiError.js
            apiResponse.js
            asyncHandler.js
            cloudinary.js
            
```

# Postman API Documentation
This documentation provides a comprehensive overview of the API endpoints available in the YouTube (custom) application.
It includes details on how to interact with the API, including request methods and endpoints.
Copy the URL and set `myURL` as variable in Postman to test the API endpoints.

## Healthcheck Controller
The Healthcheck Controller is responsible for providing a simple endpoint to check the operational status of the Youtube custom Backend application.
It allows users to verify if the application is running and accessible.
The endpoint is used to verify the operational status of the service.

## Healthcheck Routes
The Healthcheck Routes define the API endpoints for health check operations.
Let's implement the following feature:

### Endpoint - `myURL/api/v1/healthcheck`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to check the operational status of the YouTube custom Backend application.

## User Controller
The User Controller is responsible for managing user-related operations in the YouTube custom Backend application.
It handles user registration, login, logout, password management, and profile updates.
The User Controller interacts with the User model to perform CRUD operations on user data.

## User Routes
The User Routes define the API endpoints for user-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/users/register`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to register a new user.
Make sure to provide full name, username, email, password and avatar image in form-data.

---

# Assignment 1 - Test the remaining endpoints of User Controller APIs using Postman

### Endpoint - `myURL/api/v1/users/login`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to login a user.
Make sure to provide email, username and password in the request body.

### Endpoint - `myURL/api/v1/users/logout`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to logout a user.

### Endpoint - `myURL/api/v1/users/refresh-token`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to refresh the access token of a user.

### Endpoint - `myURL/api/v1/users/change-password`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to change the password of a user.
Make sure to provide old password and new password in the request body.

### Endpoint - `myURL/api/v1/users/current-user`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get the current logged-in user.

### Endpoint - `myURL/api/v1/users/update-account`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the account details of a user.
Make sure to provide full name and email in the request body.

### Endpoint - `myURL/api/v1/users/avatar`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the avatar of a user.
Make sure to provide avatar image in form-data.

### Endpoint - `myURL/api/v1/users/cover-image`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the cover image of a user.
Make sure to provide cover image in form-data.

### Endpoint - `myURL/api/v1/users/channel/:username`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get the channel details of a user by their username.

### Endpoint - `myURL/api/v1/users/history`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get the watch history of a user.

---

# Assignment 2 - Develop more controllers and routes for the YouTube custom Backend application

## Updated File Structure

```bash
YouTube_(custom)/
│   .env
│   .gitignore
│   .prettierignore
│   .prettierrc
│   package-lock.json
│   package.json
│   README.md
│   
├───node_modules/
│           
├───public/
│   └───temp/
│           .gitkeep
│           
└───src/
    │   app.js
    │   constants.js
    │   index.js
    │   
    ├───controllers/
    │       comment.controller.js
    │       dashboard.controller.js
    │       healthcheck.controllers.js
    │       like.controller.js
    │       playlist.controller.js
    │       subscription.controller.js
    │       tweet.controller.js
    │       user.controllers.js
    │       video.controller.js
    │       
    ├───db/
    │       index.js
    │       
    ├───middlewares/
    │       auth.middlewares.js
    │       multer.middlewares.js
    │       
    ├───models/
    │       comment.models.js
    │       like.models.js
    │       playlist.models.js
    │       subscription.models.js
    │       tweet.models.js
    │       user.models.js
    │       video.models.js
    │       
    ├───routes/
    │       comment.router.js
    │       dashboard.router.js
    │       healthcheck.routes.js
    │       like.router.js
    │       playlist.router.js
    │       subscription.router.js
    │       tweet.router.js
    │       user.routes.js
    │       video.router.js
    │       
    └───utils/
            apiError.js
            apiResponse.js
            asyncHandler.js
            cloudinary.js
            
```

## Video Controller
The Video Controller is responsible for managing video-related operations in the YouTube custom Backend application.
It handles video uploads, updates, deletions, and retrievals.
The Video Controller interacts with the Video model to perform CRUD operations on video data.

## Video Routes
The Video Routes define the API endpoints for video-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/videos`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to upload a video.
Make sure to use title, description, and video file under 100MB in form-data.

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all videos.

### Endpoint - `myURL/api/v1/videos/:videoId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get a video by its ID.

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the thumbnail of a video.
Make sure to provide thumbnail image in form-data.

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to delete a video.

### Endpoint - `myURL/api/v1/videos/toggle/publish/:videoId`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to publish or unpublish a video.

## Playlist Controller
The Playlist Controller is responsible for managing playlists in the YouTube custom Backend application.
It handles playlist creation, updates, deletions, and video management within playlists.
The Playlist Controller interacts with the Playlist model to perform CRUD operations on playlist data.

## Playlist Routes
The Playlist Routes define the API endpoints for playlist-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/playlists`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to create a new playlist.
Make sure to provide a title and description for the playlist.

### Endpoint - `myURL/api/v1/playlists/:playlistId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get a playlist by its ID.

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the title and description of a playlist.
Make sure to provide the updated title and description in the request body.

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to delete a playlist.

### Endpoint - `myURL/api/v1/playlists/add/:videoId/:playlistId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to add a video to a playlist.

### Endpoint - `myURL/api/v1/playlists/remove/:videoId/:playlistId`

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to remove a video from a playlist.

### Endpoint - `myURL/api/v1/playlists/user/:userId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all playlists created by a specific user.

## Subscription Controller
The Subscription Controller is responsible for managing user subscriptions to channels in the YouTube custom Backend application.
It handles subscription and retrieval of subscribed channels.
The Subscription Controller interacts with the Subscription model to perform CRUD operations on subscription data.

## Subscription Routes
The Subscription Routes define the API endpoints for subscription-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/subscriptions/channel/:channelId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to subscribe and unsubscribe a channel.

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all subscribers (followers) of a user.

### Endpoint - `myURL/api/v1/subscriptions/user/:subscriberId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all channels subscribed (following) by a user.

## Comment Controller
The Comment Controller is responsible for managing comments on videos in the YouTube custom Backend application.
It handles comment creation, updates, deletions, and retrievals.
The Comment Controller interacts with the Comment model to perform CRUD operations on comment data.

## Comment Routes
The Comment Routes define the API endpoints for comment-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/comments/:videoId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to create a new comment on a video.
Make sure to provide the content of the comment in the request body.

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all comments on a video.

### Endpoint - `myURL/api/v1/comments/comment/:commentId`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update a comment.
Make sure to provide the updated content of the comment in the request body.

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to delete a comment.

## Tweet Controller
The Tweet Controller is responsible for managing tweets in the YouTube custom Backend application.
It handles tweet creation, updates, deletions, and retrievals.
The Tweet Controller interacts with the Tweet model to perform CRUD operations on tweet data.

## Tweet Routes
The Tweet Routes define the API endpoints for tweet-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/tweets`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to create a new tweet.
Make sure to provide the content of the tweet.

### Endpoint - `myURL/api/v1/tweets/user/:userId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all tweets by a specific user.

### Endpoint - `myURL/api/v1/tweets/:tweetId`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update a tweet.
Make sure to provide the updated content of the tweet in the request body.

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to delete a tweet.

## Like Controller
The Like Controller is responsible for managing likes on videos in the YouTube custom Backend application.
It handles liking and unliking videos, as well as retrieving liked videos.
The Like Controller interacts with the Like model to perform CRUD operations on like data.

## Like Routes
The Like Routes define the API endpoints for like-related operations.
Let's implement the following features:

### Endpoint - `myURL/api/v1/likes/toggle/video/:videoId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to like or unlike a video.

### Endpoint - `myURL/api/v1/likes/toggle/comment/:commentId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to like or unlike a comment.

### Endpoint - `myURL/api/v1/likes/toggle/tweet/:tweetId`

### HTTP Method <font color = #ffe47e> POST </font>
Use this request to like or unlike a tweet.

### Endpoint - `myURL/api/v1/likes/videos`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all liked videos.