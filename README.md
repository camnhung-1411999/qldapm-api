# 1712646-DAGK

1. # User: localhost:4000/users
----------------- Sign up ----------------
POST url: localhost:4000/users
@Body - JSON
{
    "email": "user@example.com",
    "password": "example",
    "name": "user example",
    "company": "US",
    "address": "HCM, VN",
    "phone": "0987654321",
    "signature": "fe$2487iugui3%78482y^331bv27371@",
    "type": "input.type"
}

----------------- Login -----------------

POST url: localhost:4000/users/login
@Body - JSON
{
    "email": "user@example.com",
    "password": "example"
}

----------------- Get user ---------------

GET url: localhost:4000/users/

@Header
authorization: 'accessToken'

----------- Update ------------
@Header
authorization: 'accessToken'

PUT url: localhost:4000/users/
@Body - JSON
/ ??? === có thể có hoặc k
{
    "name": "user example", ???
    "company": "US", ???
    "address": "HCM, VN",???
    "phone": "0987654321",???
    "type": "input.type"  ???
}
hoặc nếu update password
{
    "oldPassword": "example", ????
    "password": "example1", ????
}

2. # file: localhost:4000/files

------------------------ Get list file of user ------------------------
@Header
authorization: 'accessToken'

GET url: localhost:4000/files/
----------------- Get 1 file by ID ---------------------

@Header
authorization: 'accessToken'

GET url: localhost:4000/files/:id

----------------- CREATE 1 file---------------------

POST url: localhost:4000/files/
file -> bỏ vào form-data

@Header
authorization: 'accessToken'


----------------- Delete 1 file by ID ---------------------
DELETE url: localhost:4000/files/:id

3. # payment: localhost:4000/payments

------------------------ Get list payment of user ------------------------
@Header
authorization: 'accessToken'
GET url: localhost:4000/payments/

----------------- Get 1 file by ID ---------------------

@Header
authorization: 'accessToken'

GET url: localhost:4000/payments/:id

----------------- CREATE 1 payment---------------------

POST url: localhost:4000/payments/

@Header
authorization: 'accessToken'
 @Body 
 {
    "amount": "100000",
 }

----------------- Delete 1 file by ID ---------------------
DELETE url: localhost:4000/payments/:id

4. # Transaction: localhost:4000/transactions

------------------------ Get list transactions ------------------------

GET url: localhost:4000/transactions/

----------------- Get 1 file by ID ---------------------

GET url: localhost:4000/transactions/:id

----------------- CREATE 1 payment---------------------

POST url: localhost:4000/transactions/
 @Body 
{
    "sender": "user@example.com",
    "receiver": "user1@example.com",
    "fileId": "5fd8474fdc1a65a3660a3c71",
    "status": "something"
}

----------------- Update transaction ------------------------

PUT url: localhost:4000/transactions/:id

@Body
{
    "sender": "user@example.com", ??
    "receiver": "user1@example.com", ??
    "fileId": "something",  ??
    "status": "something" ??
}

----------------- Delete 1 transaction by ID ---------------------
DELETE url: localhost:4000/transactions/:id