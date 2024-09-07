import styled from 'styled-components'

// < ------------------------------- ConfirmModal ------------------------------ >

export const ConfirmWrapper = styled.div`
    width: 424px;
    flex-direction: column;
    align-items: center;
    display: flex;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 32px 8px;
    gap: 16px;
  `,
  TitleDiv = styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  `,
  MessageDiv = styled.div`
    width: 360px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  `,
  FlexButtons = styled.div`
    display: flex;

    gap: 24px;
  `,
  CancelWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
`,
   FlexColButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
 `,
   Modal = styled.div`
    position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
 `,
 ModalContent = styled.div`
 background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`,
ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
`,
ModalClose = styled.div`
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
`,
XIconAlign = styled.div`
    align-self: flex-end;
`,
ModalBody = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 12px;
  gap: 4px;
  width: 496px;
  height: 233px; //233 149
  background: linear-gradient(0deg, rgba(4, 8, 9, 0.02), rgba(4, 8, 9, 0.02)), #FFFFFF;
  border: 1px solid rgba(4, 8, 9, 0.08);
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: scroll;
  overflow-x: hidden;
`,
ModalCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 8px 12px 16px;
  gap: 16px;
  background: #FFFFFF;
  width: 472px;
  height: 125px;
  border: 1px solid rgba(4, 8, 9, 0.08);
  border-radius: 8px;
`