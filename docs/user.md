# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```json
{
	"username": "chi",
	"password": "rahasia",
	"name": "Chairullatif Aji Sadewa"
}
```

Response Body Success:

```json
{
	"data": {
		"username": "chi", 
        "name": "Chairullatif Aji Sadewa"
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Username already registered",
}
```

## Login User API
Endpoint : POST /api/users/login

Request Body:

```json
{
	"username": "chi",
	"password": "rahasia",
}
```

Response Body Success:

```json
{
	"data": {
        "token": "unique-token",
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Username or password is wrong",
}
```

## Update User API
Endpoint : PATCH /api/users/current

Header: 
- Authorization: token

Request Body:

```json
{
	"name": "Chairullatif Aji Sadewa", // optional
	"password": "new password", // optional
}
```

Response Body Success:

```json
{
	"data": {
		"username": "chi", 
        "name": "Chairullatif Aji Sadewa"
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Name length max 100",
}
```

## Get User API
Endpoint : GET /api/users/current

Header: 
- Authorization: token

Request Body:

```json
{
	"data": {
		"username": "chi", 
        "name": "Chairullatif Aji Sadewa"
	}
}
```

Response Body Success:

```json
{
	"data": {
		"username": "chi", 
        "name": "Chairullatif Aji Sadewa"
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Unauthorized",
}
```

## Logout User API
Endpoint : DELETE /api/users/logout

Header: 
- Authorization: token

Response Body Success:

```json
{
	"data": "OK"
}
```

Response Body Error:

```json
{
	"erorrs": "Unauthorized",
}
```
