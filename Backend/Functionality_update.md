# `/user/register` Endpoint Documentation

## Endpoint
`POST /user/register`

## Description
This endpoint is used to register a new user in the system. It accepts user details in the request body, creates a new user record in the database, and returns a response indicating the result of the registration process.

## Required Data (Request Body)
The following fields are required in the JSON body of the request:

- `name` (string): The full name of the user.
- `email` (string): The user's email address (must be unique).
- `password` (string): The user's password.

**Example Request Body:**
```json
{
  "name": "John Doe",
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
    "message": "User registered successfully",
    "user": {
      "_id": "<user_id>",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Error Responses
- **Status Code:** `400 Bad Request`
  - **Description:** Missing required fields or invalid data.
  - **Example:**
    ```json
    {
      "error": "Name, email, and password are required."
    }
    ```
- **Status Code:** `409 Conflict`
  - **Description:** Email already exists.
  - **Example:**
    ```json
    {
      "error": "Email already registered."
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Description:** Server error during registration.
  - **Example:**
    ```json
    {
      "error": "An error occurred while registering the user."
    }
    ```

---

This documentation describes the usage, required data, and possible responses for the `/user/register` endpoint.
