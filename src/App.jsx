import {
  createBrowserRouter,
  Navigate,
  Route,
  Outlet,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import React from 'react'

import { withLDProvider } from 'launchdarkly-react-client-sdk'

// the Landing composes the entire page layou including the rendering of the job dashboard
import Landing from './components/pages/landing/Landing'
import NotFoundPage from './components/authentication/NotFoundPage'
import TermsAcceptance from './components/authentication/TermsAcceptance'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import NewRequest from './components/pages/new-request'
import ProfileSettings from './components/pages/user-settings'

import Auth0ProviderWithConfig from './utils/auth/authProvider'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NewRequestStepsProvider } from 'context/newRequestSteps'
// this outlet renders child routes matching the url path, by providing no path property we can default out root URI to the next base route path, aka '/'
const Auth0ProviderLayout = () => (
  <Auth0ProviderWithConfig>
    <Outlet />
  </Auth0ProviderWithConfig>
)

const NewRequestWithProvider = () => (
  <NewRequestStepsProvider>
    <NewRequest />
  </NewRequestStepsProvider>
)
const router = createBrowserRouter(
  createRoutesFromElements([
    // eslint-disable-next-line react/jsx-key
    <Route element={<Auth0ProviderLayout />}>
      <Route path="/" element={<ProtectedRoute component={Landing} />}>
        {/* all 3 below sibling routes use relative paths to match denoted by the absence of a prepending forward slash */}
      </Route>

      <Route
        path="/add-new-request"
        element={<ProtectedRoute component={NewRequestWithProvider} />}
      />

      <Route
        path="/profile-settings"
        element={<ProtectedRoute component={ProfileSettings} />}
      />
      <Route path="/terms-acceptance" element={<TermsAcceptance />} />
      <Route
        path="/404"
        element={<ProtectedRoute component={NotFoundPage} />}
      />
      <Route path="/*" element={<Navigate to="/404" replace />} />
    </Route>,
  ]),
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  )
}

export default withLDProvider({
  clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID,
  context: {
    kind: 'test',
    key: 'sample_test',
    name: 'Sample',
    email: 'Sample@example.com',
  },
})(App)

//export default App
