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

## [Data Model](https://app.eraser.io/workspace/Glfyb7q3zdi9q8fYEccc?origin=share)

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

---

# Postman API Documentation
This documentation provides a comprehensive overview of the API endpoints available in the YouTube (custom) application.
It includes details on how to interact with the API, including request methods, endpoints, request bodies, and expected responses.
Copy the URL and set `myURL` as variable in Postman to test the API endpoints.

## healthcheck

### <font color = #6bdd9a> GET </font> New Request

`myURL/api/v1/healthcheck`

### Healthcheck API
The Healthcheck API endpoint is used to verify the operational status of the service.
It provides a simple way to check if the application is running and accessible.

### Request
* <b> HTTP Method </b>: GET
* <b> Endpoint </b>: `myURL/api/v1/healthcheck`

### Response
### Expected Status Codes
* <b> 200 OK </b>: Indicates that the service is healthy and operational.

### Response Body
The response body is returned in JSON format and contains the following fields:
* statusCode: A numerical code indicating the status of the health check (0 indicates success).
* data: A placeholder for any additional data related to the health check (may be empty).
* message: A message providing further details about the health status (may be empty).
* success: A boolean indicating whether the health check was successful (true indicates success).

** Example Response

```JSON
JSON

{
    "statusCode": 200,
    "data": "OK",
    "message": "Health check passed",
    "success": true
}
```

This response confirms that the service is functioning correctly.
If the service is down or experiencing issues, a different status code will be returned along with relevant error information.

## users

### <font color = #ffe47e> POST </font> register

`myURL/api/v1/users/register`

### User Registration API
This endpoint allows users to register by providing their details, including optional avatar and cover image uploads.
The request must include the required fields: `fullname`, `email`, `username`, and `password`.
Additionally, users can upload an optional `avatar` and `coverImage`.

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `myURL/api/v1/users/register`

<b> Request Body (form-data) </b>

| Parameter | Type | Description |
| :---: | :---: | :---: |
| `fullname` | text| The full name of the user. |
| `email` | text | The email address of the user. |
| `username` | text | The desired username for the user. |
| `password` | text | The password for the user account. |
| `avatar` | file | An optional profile image for the user. |
| `coverImage` | file | An optional cover image for the user. |

### Response
* <b> Status Code </b>: 201 Created
* <b> Content-Type </b>: application/json

### Response Body

```JSON
JSON

{
  "statusCode": 0,
  "data": {
    {
        "_id":{"$oid":"686cbd625ead05aab2f2d4b5"},
        "username":"test",
        "email":"test@gmail.com",
        "fullname":"Test",
        "avatar":"cloudinary url for avatar",
        "coverImage":"cloudinary url for cover image",
        "watchHistory":[],
        "password":"$2b$10$Q..GeKOGSwU/yIf4ZIARD.Lp/pKYT56VbIl/hBwYMYFo6ru0bQuTi",
        "createdAt":{"$date":{"$numberLong":"1751956834519"}},
        "updatedAt":{"$date":{"$numberLong":"1751956834519"}},
        "__v":{"$numberInt":"0"}
    }
  },
  "message": "User registered successfully",
  "success": true
}
```

### Expected Behavior
Upon successful registration, the API will respond with a 201 Created status code, indicating that the user has been successfully registered.
The response will include a success message and the user data, such as the user's ID, username, email, fullname, and any uploaded images.
The watchHistory will be initialized as an empty array, and timestamps for createdAt and updatedAt will be provided.
This endpoint is crucial for user onboarding and ensures that all necessary information is collected for account creation.
This endpoint allows users to register by providing their details.
It is essential to ensure that all required fields are filled out correctly to successfully create a new user account.

### Body <sub> form-data </sub>
<table>
<tr> <td> fullname </td> <td> Test </td> </tr>
<tr> <td> email </td> <td> test@gmail.com </td> </tr>
<tr> <td> username </td> <td> test </td> </tr>
<tr> <td> password </td> <td> 123456789 </td> </tr>
<tr> <td> avatar </td> <td> avatar local file path </td> </tr>
<tr> <td> coverImage </td> <td> cover image local file path </td> </tr>
</table>

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `myURL/api/v1/users/register`

<b> Request Body </b>:
The request body must be in JSON format and include the following parameters:
* `fullname` (string): The full name of the user. Required.
* `email` (string): The email address of the user. Required.
* `username` (string): The desired username for the account. Required.
* `password` (string): The password for the account. Required.

### Response
* <b> Status Code </b>: 400 Bad Request
* <b> Content-Type </b>: text/html

When one or multiple fields are left empty, the API will respond with a 400 Bad Request status code.
The response will indicate which fields are required and provide a message detailing the validation errors.

### Validation Rules
* All fields (fullname, email, username, password) are mandatory.
* If any of these fields are missing or empty, the API will return an error message specifying the required fields.

### Example Error Response

```HTML
HTML

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Error: All fields are required<br> <!-- Tons of Error messages... --> </pre>
</body>

</html>
```

Ensure to provide valid input for all required fields to avoid receiving a 400 Bad Request response.

---

# Assignment 1 - Test some of the endpoints in users using Postman

### <font color = #ffe47e> POST </font> login

`myURL/api/v1/users/login`

### User Login API
This endpoint allows users to log in to the application by providing their credentials.
Upon successful authentication, the server responds with user details and tokens for session management.

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `myURL/api/v1/users/login`

### Headers
<b> Content-Type </b>: `application/json`

Specifies that the request body format is JSON.

### Request Body
The request body must be a JSON object containing the following parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| email | string | The email address of the user. |
| username | string | The username of the user. |
| password | string | The password for the user account. |

### Example Request Body

```JSON
JSON

{
  "email": "test@gmail.com",
  "username": "test",
  "password": "123456789"
}
```

### Response
On a successful login, the server will return a JSON response with the following structure:

### Response Structure
| Key | Type | Description |
| --- | --- | --- |
| statusCode | number | The status code indicating the result of the request. |
| data | object | Contains the user information and tokens. |
| message | string | A message indicating the result of the login attempt. |
| success | boolean | Indicates whether the login was successful. |

### User Data Structure
The data object includes:

| Key | Type | Description |
| --- | --- | --- |
| user | object | Information about the logged-in user. |
| accessToken | string | Token for accessing protected routes. |
| refreshToken | string | Token for refreshing the session. |

The user object contains the following fields:
 * `_id`: User's unique identifier.
 * `username`: User's username.
 * `email`: User's email address.
 * `fullname`: User's full name.
 * `avatar`: URL to the user's avatar image.
 * `coverImage`: URL to the user's cover image.
 * `watchHistory`: Array of videos watched by the user.
 * `createdAt`: Timestamp of user account creation.
 * `updatedAt`: Timestamp of the last update to the user account.
 * `__v`: Version key for the user document.

### Example Response

```JSON
JSON

{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "686cbd625ead05aab2f2d4b5",
            "username": "test",
            "email": "test@gmail.com",
            "fullname": "Test",
            "avatar": "cloudinary url for avatar",
            "coverImage": "cloudinary url for cover image",
            "watchHistory": [],
            "createdAt": "2025-07-08T06:40:34.519Z",
            "updatedAt": "2025-07-10T13:46:09.969Z",
            "__v": 0
        },
        "accessToken": "long value of access token",
        "refreshToken": "long value of refresh token"
    },
    "message": "User logged in successfully",
    "success": true
}
```

### Status Codes
200 OK: Successfully logged in.
4xx: Client error, such as invalid credentials or missing parameters.
5xx: Server error, indicating an issue with the login process.

Ensure that the request body is properly formatted and contains all required fields to avoid errors during login.

### <font color = #ffe47e> POST </font> refresh-token

`myURL/api/v1/users/refresh-token`

### Refresh Token API
This endpoint allows users to refresh their authentication tokens.
It is essential for maintaining a valid session without requiring the user to log in again.

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `myURL/api/v1/users/refresh-token`

### Headers
* <b> Content-Type </b>: `application/json`
* Authorization: `Bearer {your_access_token}` (if required)

### Request Body
The request body must be sent as a JSON object and should include the following field:
refresh_token (string): The token that is used to obtain a new access token.

Example Request Body

```JSON
JSON

{
    "statusCode": 200,
    "data": {
        "accessToken": "long value of access token",
        "refreshToken": "long value of new refresh token"
    },
    "message": "Access token refreshed successfully",
    "success": true
}
```

### Response
### Success Response
* Status Code: 200
* Content-Type: `application/json`

### Error Response
In case of an error, the API may return different status codes along with an error message.
The structure will typically include:
* statusCode: An error code indicating the type of error.
* message: A description of the error.
* success: A boolean indicating the failure of the request.

### Notes
* Ensure that the refresh_token is valid and has not expired.
* The returned accessToken and refreshToken should be stored securely for future requests.

### <font color = #ffe47e> POST </font> logout

`myURL/api/v1/users/logout`

### User Logout API
This endpoint is used to log the user out of the application.
By sending a POST request to this endpoint, the user will be successfully logged out,
and any session or authentication tokens will be invalidated.

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `myURL/api/v1/users/logout`

### Request Body
The request body may include the following parameter:

token (string): A token used for authentication to verify the user's identity during the logout process.
This parameter is essential to ensure that the logout request is valid.

### Response
Upon a successful logout, the server will respond with a JSON object containing the following fields:
* statusCode: Indicates the status of the request (0 for success).
* data: An empty object, as no additional data is returned upon successful logout.
* message: A string that may contain a confirmation message (may be empty).
* success: A boolean indicating the success of the logout operation (true).

### Status Codes
200 OK: Indicates that the logout was successful.

<i> And more and more testing works like this... </i>

---

# Assignment 2 - Develop more controllers and routes for the YouTube custom Backend application

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
Make sure to use title, description, and video file under 100MB.

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all videos.

### Endpoint - `myURL/api/v1/videos/:videoId`

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get a video by its ID.

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update the thumbnail of a video.

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

### HTTP Method <font color = #6bdd9a> GET </font>
Use this request to get all comments on a video.

### Endpoint - `myURL/api/v1/comments/comment/:commentId`

### HTTP Method <font color = #c0a8e1> PATCH </font>
Use this request to update a comment.

### HTTP Method <font color = #f79a72> DELETE </font>
Use this request to delete a comment.