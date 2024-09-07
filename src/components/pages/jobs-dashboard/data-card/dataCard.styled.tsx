import styled from 'styled-components'

export const StyledDataCard = styled.div<{
  ThemeContext: any
}>`
background: #ffffff;
  color: '#8d8d8d',
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Inter';
  border: 1px solid #e9e9e9;
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 10px;
`
export const TitleDiv = styled.div`
  font-size: 16px;
  font-weight: 800;
  padding: 22px 24px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
`
