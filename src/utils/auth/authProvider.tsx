import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { PropsWithChildren } from 'react'
import {
  AUTH0_AUDIENCE,
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
} from 'constants/environment.js'

interface Auth0ProviderWithConfigProps {
  children: React.ReactNode
}

// as a high level provider Auth0 configuration must pass down its settings as a parent to all routes. It must be the root of the routes tree which is denoted here by passing children intrinsily through it.
const Auth0ProviderWithConfig = ({
  children,
}: PropsWithChildren<Auth0ProviderWithConfigProps>): JSX.Element | null => {
  const domain = AUTH0_DOMAIN
  const clientId = AUTH0_CLIENT_ID
  const redirectUri = AUTH0_CALLBACK_URL
  const audience = AUTH0_AUDIENCE
  const scope = AUTH0_SCOPE

  if (!(domain && clientId && redirectUri && audience && scope)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      scope={scope}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithConfig
