import styled from 'styled-components'

export const ModalDiv = styled.div`
  background: #fff;
  margin-top: -250px;
  border: none;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 10px;
  cursur: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 20;
  width: 530px;
  padding: 27px;
  &label {
    display: block;
  }
  @media (max-width: 670px) {
    width: auto;
  }
`
export const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 670px) {
    flex-direction: column;
    gap: 16px;
  }
`
export const LabelSpan = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
