# YouTube_(custom)

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

## healthcheck

### <font color = #6bdd9a> GET </font> New Request

`http://localhost:8000/api/v1/healthcheck`

### Healthcheck API
The Healthcheck API endpoint is used to verify the operational status of the service.
It provides a simple way to check if the application is running and accessible.

### Request
* <b> HTTP Method </b>: GET
* <b> Endpoint </b>: `http://localhost:8000/api/v1/healthcheck`

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

---

## users

### <font color = #ffe47e> POST </font> New Request

`http://localhost:8000/api/v1/users/register`

### User Registration API
This endpoint allows users to register by providing their details, including optional avatar and cover image uploads.
The request must include the required fields: `fullname`, `email`, `username`, and `password`.
Additionally, users can upload an optional `avatar` and `coverImage`.

### Request
* <b> HTTP Method </b>: POST
* <b> Endpoint </b>: `http://localhost:8000/api/v1/users/register`

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
* <b> Endpoint </b>: `http://localhost:8000/api/v1/users/register`

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


