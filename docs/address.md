# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/address

Header:

- Authorization: token

Request Body:

```json
{
	"street": "Jalam Mulawarman",
	"city": "Jakarta Utara",
	"province": "DKI Jakarta",
	"country": "Indonesia",
	"postal_code": "09431"
}
```

Response Body Success:

```json
{
	"id": 1,
	"street": "Jalam Mulawarman",
	"city": "Jakarta Utara",
	"province": "DKI Jakarta",
	"country": "Indonesia",
	"postal_code": "09431"
}
```

Response Body Error:

```json
{
	"erorrs": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Header:

- Authorization: token

Request Body:

```json
{
	"street": "Jalam Mulawarman",
	"city": "Jakarta Utara",
	"province": "DKI Jakarta",
	"country": "Indonesia",
	"postal_code": "09431"
}
```

Response Body Success:

```json
{
	"id": 1,
	"street": "Jalam Mulawarman",
	"city": "Jakarta Utara",
	"province": "DKI Jakarta",
	"country": "Indonesia",
	"postal_code": "09431"
}
```

Response Body Error:

```json
{
	"erorrs": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Header:

- Authorization: token

Response Body Success:

```json
{
	"id": 1,
	"street": "Jalam Mulawarman",
	"city": "Jakarta Utara",
	"province": "DKI Jakarta",
	"country": "Indonesia",
	"postal_code": "09431"
}
```

Response Body Error:

```json
{
	"erorrs": "Contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Header:

- Authorization: token

Response Body Success:

```json
{
	"data": [
		{
			"id": 1,
			"street": "Jalam Mulawarman",
			"city": "Jakarta Utara",
			"province": "DKI Jakarta",
			"country": "Indonesia",
			"postal_code": "09431"
		},
		{
			"id": 2,
			"street": "Jalam Mulawarman",
			"city": "Jakarta Utara",
			"province": "DKI Jakarta",
			"country": "Indonesia",
			"postal_code": "09431"
		}
	]
}
```

Response Body Error:

```json
{
	"erorrs": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
	"erorrs": "Address is not found"
}
```
