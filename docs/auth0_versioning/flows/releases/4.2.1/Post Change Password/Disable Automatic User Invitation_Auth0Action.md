# Disable Automatic User Invitation

## Description

This action will use the auth0 management api to set a value invitedToMyApp to false. This is to prevent the automatic email from being sent

## Secrets

| Key            | Value                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `clientId`     | `Credentials for Machine to Machine`<br>Example: `found in tennant at Applications > Applications` |
| `clientSecret` | `Credentials for Machine to Machine`<br>Example: `found in tennant at Applications > Applications` |
| `domain`       | `The domain of the auth0 tennant`<br>Example: `sorenson-customerportal.us.auth0.com`               |

CONSENT_FORM_URL : https://{domain for deployed app}/terms-acceptance ie(https://portal.sorenson.com/terms-acceptance)

## Dependencies

Auth0@2.9.1

## Code Snippet

/\*\*

- Handler that will be called during the execution of a PostChangePassword flow.
-
- @param {Event} event - Details about the user and the context in which the change password is happening.
- @param {PostChangePasswordAPI} api - Methods and utilities to help change the behavior after a user changes their password.
  \*/
  exports.onExecutePostChangePassword = async (event, api) => {
  const ManagementClient = require('auth0').ManagementClient;
  const management = new ManagementClient({
  domain: event.secrets.domain,
  clientId: event.secrets.clientId,
  clientSecret: event.secrets.clientSecret,
  });
  //console.log( event.secrets.clientId)

  //console.log( event.secrets.clientSecret)

  //console.log( event.secrets.domain)
  try {
  const params = { id : event.user.user_id};
  const res = await management.getUser(params);
  const app_metadata = res.app_metadata
  const invitationEmailDisabled_app_metadata = {...app_metadata, invitedToMyApp: false}
  try {
  await management.updateAppMetadata(params, invitationEmailDisabled_app_metadata)
  } catch (e) {
  console.log(e)
  }
  } catch (e) {
  console.log(e)
  }
  };
