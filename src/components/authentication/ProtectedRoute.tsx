import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ComponentType } from 'react'
import PageLoader from 'shared/page-loader'

interface ProtectedRouteProps {
  component: ComponentType
}

function ProtectedRoute({ component }: ProtectedRouteProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  })

  return <Component />
}

export default ProtectedRoute
