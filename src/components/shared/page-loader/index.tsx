import React from 'react'
import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

const CenterLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40vh 0 0 0;
`

function PageLoader() {
  return (
    <CenterLoading>
      <CircularProgress
        size="3.5rem"
        sx={{
          color: '#28BFB2',
        }}
      />
    </CenterLoading>
  )
}

export default PageLoader
