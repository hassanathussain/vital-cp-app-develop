import styled from 'styled-components'

export const PickerDiv = styled.div<{
  expanded: boolean
  offset?: string
}>`
  position: absolute;
  right: ${({ offset }) => (offset ? offset : '50px')};
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  background: #fff;
  margin-top: 6px;
  width: fit-content;
  border: none;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 4px;
  cursur: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 20;
  &label {
    display: block;
  }
`