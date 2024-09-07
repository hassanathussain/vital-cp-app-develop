import styled from 'styled-components'

export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 320px;
  height: 36px;
`

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
  gap: 8px;

  width: 320px;
  height: 8px;
`

export const StyledContainer = styled.div`
  display: flex;
`

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 320px;
  height: 24px;
  justify-content: space-between;
`

export const StyledStepLength = styled.div`
  color: rgba(0, 0, 0, 0.57);
`

export const StyledLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
`

export const StyledDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  //padding-top: 10px;
`

export const StyledBar = styled.div<{
  isActive: boolean
}>`
  width: 101.33px;
  height: 8px;
  background: ${({ isActive }) =>
    isActive ? '#28bfb2' : 'rgba(0, 0, 0, 0.08)'};
  border-radius: 16px;
  min-height: 5px;
  min-width: 34px;
`
