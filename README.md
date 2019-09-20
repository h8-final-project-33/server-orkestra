# server-orkestra

Deploy server: not yet<br>
baseUrl: http://localhost:3000/user/

# server-user

Routes
---

  
- GET : /
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
- POST : /register
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
- POST : /login
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
                Status Code : 201
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

- PATCH : /addScore
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
                Status Code : 201
                ``` 
                    {message: 'score has been added'}
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
- PATCH : /addVocab
    - description : add favorite word to database
        - body :
            ```
            {
               addVocab: String
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
                Status Code : 201
                ``` 
                    {message: 'vocab has been added to favorite'}
                ```
            - Error :
                Status Code : 500

                ```
                    {"message" : "Internal Server Error"}

                ```

- PATCH : /leaderboard
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
                Status Code : 201
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