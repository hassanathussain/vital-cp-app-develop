import styled from 'styled-components'

export const ModalContainer = styled.div<{
  $isMultiple: boolean
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: flex-start;
  padding: 12px;
  gap: 4px;
  width: 496px;
  height: ${({ $isMultiple }) => ($isMultiple ? '233px' : '149px')}; //233 149
  background: linear-gradient(0deg, rgba(4, 8, 9, 0.02), rgba(4, 8, 9, 0.02)),
    #ffffff;
  border: 1px solid rgba(4, 8, 9, 0.08);
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: scroll;
  overflow-x: hidden;
`
