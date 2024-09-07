# Redirect to consent form Test Action

## Secrets

| Key                | Value                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `CONSENT_FORM_URL` | `https://{domain for deployed app}/terms-acceptance`<br>Example: `https://portal.sorenson.com/terms-acceptance` |

CONSENT_FORM_URL : https://{domain for deployed app}/terms-acceptance ie(https://portal.sorenson.com/terms-acceptance)

## Dependencies

N/A

## Code Snippet

/\*\*

- Handler that will be called during the execution of a PostLogin flow.
-
- @param {Event} event - Details about the user and the context in which they are logging in.
- @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
  \*/
  exports.onExecutePostLogin = async (event, api) => {
  const consentGiven = event.user.user_metadata['consentGiven'];
  //console.log(event.client);
  //console.log(event.secrets.CONSENT_FORM_URL);
  // redirect to consent form if user has not yet consented
  if(consentGiven === undefined || consentGiven == false) {
  api.redirect.sendUserTo(event.secrets.CONSENT_FORM_URL);
  }
  };

/\*\*

- Handler that will be invoked when this action is resuming after an external redirect. If your
- onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
-
- @param {Event} event - Details about the user and the context in which they are logging in.
- @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
  \*/
  // if user clicks 'I agree' on the consent form, save it to their profile so they don't get prompted again
  exports.onContinuePostLogin = async (event, api) => {
  //console.log(event.request.body.confirm);
  api.user.setUserMetadata("consentGiven", true);
  api.user.setUserMetadata("consentTimestamp", Date.now());
  return;
  };
