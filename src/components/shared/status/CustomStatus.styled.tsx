import styled from 'styled-components'

export const StatusDiv = styled.div<{
  color?: string
  backgroundColor?: string
}>`
  padding: 2px 8px;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  width: fit-content;
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'white'};
  color: ${({ color }) => (color ? color : 'black')};

  .material-symbols-outlined {
    font-size: 12px;
    align-self: center;
  }
`
