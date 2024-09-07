import styled from 'styled-components'

export const StyledMainLabel = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.84);
    line-height: 20px;
  `,
  StyledDescription = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    //padding-top: 10px;
  `,
  StyledFont = styled.div`
    font-size: 30px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
    font-family: 'Inter';
    font-style: normal;
    height: 38px;
  `,
  StyledSubtitle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    width: 264px;
    height: 24px;
    color: rgba(0, 0, 0, 0.6);
  `,
  StyledTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 264px;
    height: 70px;
  `,
  StyledStepInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
  `,
  StyledInput = styled.div`
    float: right;
  `,
  AbsoluteFullPage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: max-content;
    min-height: 100vh;
    width: 100%;
    background-color: white;
  `,
  AbsoluteFullPageWrapper = styled.div`
    position: absolute;
    left: 0;
    height: max-content;
    min-height: 100vh;
    width: 100%;
    background-color: white;
  `
