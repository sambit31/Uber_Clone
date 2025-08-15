
# `/user/register` Endpoint Documentation

## Endpoint
`POST /user/register`

## Description
Registers a new user in the system. Accepts user details in the request body, creates a new user record in the database, and returns a response indicating the result of the registration process.

## Required Data (Request Body)
The following fields are required in the JSON body of the request:

- `firstname` (string): The user's first name (min 3 characters).
- `lastname` (string): The user's last name (min 3 characters).
- `email` (string): The user's email address (must be unique).
- `password` (string): The user's password.

**Example Request Body:**
```json
{
	"firstname": "John",
	"lastname": "Doe",
	"email": "john@example.com",
	"password": "yourpassword"
}
```

## Responses

### Success
- **Status Code:** `201 Created`
- **Description:** User registered successfully.
- **Example Response:**
	```json
	{
		"success": true,
		"message": "User registered successfully",
		"user": {
			"_id": "<user_id>",
			"email": "john@example.com",
			"fullname": {
				"firstname": "John",
				"lastname": "Doe"
			}
		},
		"token": "<jwt_token>"
	}
	```

### Error Responses
- **Status Code:** `400 Bad Request`
	- **Description:** Missing required fields or invalid data.
	- **Example:**
		```json
		{
			"success": false,
			"message": "Firstname, lastname, email, and password are required."
		}
		```
- **Status Code:** `409 Conflict`
	- **Description:** Email already exists.
	- **Example:**
		```json
		{
			"success": false,
			"message": "Email already registered."
		}
		```
- **Status Code:** `500 Internal Server Error`
	- **Description:** Server error during registration.
	- **Example:**
		```json
		{
			"success": false,
			"message": "Registration failed"
		}
		```

---

This documentation describes the usage, required data, and possible responses for the `/user/register` endpoint as of the latest backend update.
