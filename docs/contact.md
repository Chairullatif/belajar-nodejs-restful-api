# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Header:

- Authorization: token

Request Body:

```json
{
	"first_name": "Chairullatif",
	"last_name": "Aji",
	"email": "chairullatif@gmail.com",
	"phone": "090928345"
}
```

Response Body Success:

```json
{
	"id": 1,
	"first_name": "Chairullatif",
	"last_name": "Aji",
	"email": "chairullatif@gmail.com",
	"phone": "090928345"
}
```

Response Body Error:

```json
{
	"erorrs": "Email is not valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Header:

- Authorization: token

Request Body:

```json
{
	"first_name": "Chairullatif",
	"last_name": "Aji",
	"email": "chairullatif@gmail.com",
	"phone": "090928345"
}
```

Response Body Success:

```json
{
	"id": 1,
	"first_name": "Chairullatif",
	"last_name": "Aji",
	"email": "chairullatif@gmail.com",
	"phone": "090928345"
}
```

Response Body Error:

```json
{
	"erorrs": "Email is not valid"
}
```

## Get Contact API;

Endpoint : POST /api/contacts/:id

Header:

- Authorization: token

Response Body Success:

```json
{
	"data": {
		"id": 1,
		"first_name": "Chairullatif",
		"last_name": "Aji",
		"email": "chairullatif@gmail.com",
		"phone": "090928345"
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Contact is not found"
}
```

## Search Contact API;

Endpoint : POST /api/contacts

Header:

- Authorization: token

Query params:

- name : Search by firs_name or last_name using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : Number of page, default 1
- size : size per page, default 10

Response Body Success:

```json
{
	"data": [
		{
			"id": 1,
			"first_name": "Chairullatif",
			"last_name": "Aji",
			"email": "chairullatif@gmail.com",
			"phone": "090928345"
		},
		{
			"id": 2,
			"first_name": "Chairullatif",
			"last_name": "Aji",
			"email": "chairullatif@gmail.com",
			"phone": "090928345"
		}
	],
	"paging": {
		"page": 1,
		"total_page": 3,
		"total_item": 30
	}
}
```

Response Body Error:

```json
{
	"erorrs": "Contact is not found"
}
```

## Remove Contact API;

Endpoint : DELETE /api/contacts/:id

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
	"erorrs": "Contact is not found"
}
```

Response Body Error:

```json
{
	"erorrs": "Username already registered"
}
```
