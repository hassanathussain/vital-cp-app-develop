import React from 'react'
import styled from 'styled-components'

import Navbar from '../../navbar'
import JobDashboard from '../jobs-dashboard'

const LandingLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`

const MainFillFlex = styled.main`
  flex: 1;
`

function Landing() {
  return (
    <LandingLayout>
      <Navbar />
      <MainFillFlex>
        <JobDashboard />
      </MainFillFlex>
    </LandingLayout>
  )
}

export default Landing
