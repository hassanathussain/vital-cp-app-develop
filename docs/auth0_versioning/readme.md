# Auth0 Versioning Documentation

This application is tightly integrated with Auth0.

The purpose of this documentation is to provide version control and enable a proper QA process.

## Credentials Overview

This section provides an overview of the credentials used.

## Logs

Logs are available via the Auth0 tenant:

- **Path:** Monitoring > Logs

## Critical Environment Variables for Auth0

All environment variables are found in the Auth0 tenant and are used in the task definition file.

### `AUTH0_AUDIENCE`

- **Location:** Applications > APIs

### `AUTH0_DOMAIN`

- **Location:** Applications > APIs

### `AUTH0_CALLBACK_URL`

- **Description:** The URL for the VCP app

### `AUTH0_CLIENT_ID`

- **Location:** Applications > Applications (should be the Single Page Application option)

## Flows

Auth0 allows you to hook into the authentication process using custom JavaScript code snippets invoked at different stages (e.g., Post Change Password). Auth0 provides a versioning system within the tenant, but we should maintain our own version of these code snippets. These will be found in the `flows` directory.

## Testing

### Testing Auth0 Tenant via `curl`

When testing, use a client with M2M credentials:

```bash
curl --request POST \
  --url https://{AUTH0_DOMAIN}/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"{AUTH0_CLIENT_ID}","client_secret":"{AUTH0_CLIENT_SECRET}","audience":"{AUTH0_AUDIENCE}","grant_type":"client_credentials"}'
```

## Tennants

- **sorenson-vital-test : DEV & QA**
  https://manage.auth0.com/dashboard/us/sorenson-vital-test

- **sorenson-prepred : UAT**
  https://manage.auth0.com/dashboard/us/sorenson-preprod

- **sorenson-customerportal : PROD**
  https://manage.auth0.com/dashboard/us/sorenson-customerportal
