# server-orkestra

**baseUrl: http://35.240.151.208/** 

# server-user

Routes
---

  
- **GET : /user**
    - description : get data user
        - body : -
        - Headers : 
            ```
            {
                token: JWT TOKEN
            }

            ```

        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {
                        "score": 36,
                        "vocabs": [],
                        "_id": "5d83810876d5eb45a68ff158",
                        "username": "mromiari",
                        "email": "mromiari@gmail.com",
                        "password": "$2a$10$hwZ8pgbXIE7ynrIb4ClQ0uKinpm2AmIrxWWpb3JS2NsHPSQnSaju6",
                        "avatar": "",
                        "__v": 0
                    }
                ```
- **POST : /user/register**
    - description : REGISTER USER
        - body :
            ```
            {
                username : String, required:true, unique:true
                email : String, required:true, unique:true
                password : String
                avatar: String
            }
            ```
        - Headers : -
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {
                    "score": 0,
                    "vocabs": [],
                    "_id": "5d83810876d5eb45a68ff158",
                    "username": "mromiari",
                    "email": "mromiari@gmail.com",
                    "password": "$2a$10$hwZ8pgbXIE7ynrIb4ClQ0uKinpm2AmIrxWWpb3JS2NsHPSQnSaju6",
                    "avatar": "",
                    "__v": 0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
- **POST : /user/login**
    - description : LOGIN USER
        - body :
            ```
            {
                email : String, 
                password : String
            }
            ```
        - Headers : -
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgzODEwODc2ZDVlYjQ1YTY4ZmYxNTgiLCJ1c2VybmFtZSI6Im1yb21pYXJpIiwiZW1haWwiOiJtcm9taWFyaUBnbWFpbC5jb20iLCJpYXQiOjE1Njg5MDAyNjl9.6AsPbdCFBEJgpyb9CtW6O_XZwNkxZmBrOiuzJtKNpNk"
                }
                ```
                Status Code : 404
                ``` 
                {
                    "message": "invalid password/username"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

- **PATCH : /user/addScore**
    - description : add current score to total score in database
        - body :
            ```
            {
                getScore: Number
            }
            ```
        - Headers : 
            ```
            {
                token: JWT TOKEN
            }

            ```

        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {message: 'score has been added'}
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
- **PATCH : /user/addVocab**
    - description : add favorite word to database
        - body :
            ```
            {
               vocab: String
            }
            ```
        - Headers : 
            ```
            {
                token: JWT TOKEN
            }

            ```

        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {message: 'vocab has been added to favorite'}
                ```
            - Error :
                Status Code : 500

                ```
                    {"message" : "Internal Server Error"}

                ```
- **PATCH : /user/addHistory**
    - description : add image history to database
        - body :
            ```
            {
               imageID: ObjectID of Image
            }
            ```
        - Headers : 
            ```
            {
                token: JWT TOKEN
            }

            ```

        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {message: 'image has been added to history'}
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

      

- **PATCH : /user/leaderboard**
    - description : get leaderboard of score and limit the number
        - body :
            ```
            {
               limit: Number
            }
            ```
        - Headers : -

        - Response :
            - Success :
                Status Code : 200
                ``` 
                [
                    {
                        "score": 46,
                        "vocabs": [
                            "suicidial",
                            "purify",
                            "enlightment"
                        ],
                        "_id": "5d83810876d5eb45a68ff158",
                        "username": "mromiari",
                        "email": "mromiari@gmail.com",
                        "password": "$2a$10$hwZ8pgbXIE7ynrIb4ClQ0uKinpm2AmIrxWWpb3JS2NsHPSQnSaju6",
                        "avatar": "",
                        "__v": 0
                    },
                    {
                        "score": 0,
                        "vocabs": [
                            ""
                        ],
                        "_id": "5d837fa3f6dc0c4546f5b1a3",
                        "username": "mromiario",
                        "email": "mromiario@gmail.com",
                        "password": "$2a$10$grC3I.0wOBc4Yw3WSSZQjO9zRagbwEWsSsYwQeCe2CbJgMteEpwPG",
                        "avatar": "",
                        "__v": 0
                    }
                 ]
                ```
            - Error :
                Status Code : 500

                ```
                    {"message" : "Internal Server Error"}

                ```
- **PATCH : /user/editProfile**
    - description : edit profile
        - body :
            ```
            {
               username: String,
               email: String,
               password: String,
               avatar: String,
               birthday: Date (YYY/MM/DD)
               gender: String
            }
            ```
        - Headers : JWT TOKEN

        - Response :
            - Success :
                Status Code : 200
                ``` 
                    {
                        "message": "data has been updated"
                    }
                ```
            - Error :
                Status Code : 500

                ```
                    {"message" : "Internal Server Error"}

                ```
# SERVER MVP IMAGE

## Routes

### Get All Image

- Method
    - **GET**
- Route
    - `/images/all/:limit`
- Params
    - limit: Number (Number of how many photos wanted)    
- Response
    - `code: 200`
    ```JS
        [{
            "description": [
                {
                    "name": "Building",
                    "coordinates": [
                        {
                            "x": 0.009003288112580776,
                            "y": 0.11136158555746078
                        },
                        {
                            "x": 0.9957922101020813,
                            "y": 0.11136158555746078
                        },
                        {
                            "x": 0.9957922101020813,
                            "y": 0.8152372241020203
                        },
                        {
                            "x": 0.009003288112580776,
                            "y": 0.8152372241020203
                        }
                    ]
                }
            ],
            "label": [
                "Building",
                "Architecture",
                "Landmark",
            ],
            "_id": "5d873448c8edd4bf61c91bb9",
            "owner": "5d85a0d113c6a18483e0833c",
            "featured_image": "https://storage.googleapis.com/nfs-ecommerce/upload/1569141815896",
            "created_at": "2019-09-22T08:43:52.700Z",
            "updated_at": "2019-09-22T08:43:52.700Z",
            "__v": 0
        }]
    ```

### Get One Image

- Method
    - **GET**
- Route
    - `/images/:id`
- Response
    - `code: 200`
    ```JS
    [
        {
            "image": "<Image URL>",
            "description": "<Array>",
            "created_at": "<Date>",
            "updated_at": "<Date>",
            "__v": 0
        }
    ]
    ```

### Create Image

- Method
    - **POST**
- Route
    - `/images`
- Body
    - image: String (base64)
- Headers
    - `{ accesstoken: "<generated access token>"}`
- Response
    `code: 201`

### Delete Image

- Method
    - **DELETE**
- Route
    - `/images/:id`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body: -
- Response
    - `code: 200`
    ```JS
        {
            "message": "Image deleted"
        }
    ```

### Find My Image

- Method
    - **GET**
- Route
    - `/find/myImage`
- Header
    - `{ accesstoken: "<generated access token>"}`
- Body: -
- Response
    - `code: 200`


---
