import React, { useEffect } from 'react'
import styled from 'styled-components'
const BackdropDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Backdrop = ({ children, onClick }: any) => {
  window.onscroll = function () {
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <BackdropDiv onClick={onClick}>{children}</BackdropDiv>
}

export default Backdrop
