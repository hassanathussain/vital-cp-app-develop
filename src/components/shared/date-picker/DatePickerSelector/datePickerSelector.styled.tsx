import styled from 'styled-components'

export const DatePickerSelectorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 42px;

  margin-bottom: 8px;
  z-index: 1;
  width: 100%;
`
export const DatePickerSelectorIconDiv = styled.div<{
  $rotate?: boolean
}>`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: ${({ $rotate }) => ($rotate ? 'rotate(90deg)' : 'rotate(-90deg)')};
  :hover {
    background: #e0e0e0;
  }
`
