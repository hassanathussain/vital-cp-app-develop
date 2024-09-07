import styled, { keyframes } from 'styled-components'

export const XIconAlign = styled.div`
    align-self: flex-end;
  `,
  FlexDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  `,
  FlexAlign = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-self: flex-start;
  `,
  ParagraphFont = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;

    letter-spacing: 0.35px;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0.35px;
    margin: 0px;
  `,
  DivFont = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  `,
  FlexAndJustify = styled.div<{
    isDetailView?: any
  }>`
    display: flex;
    margin: ${(props) => (props.isDetailView ? '15px 0px' : '25px 0px')};
    width: 100%;
    justify-content: space-between;
  `,
  Paragrapgh12Font = styled.p`
    font-weight: 600;
    font-size: 12px;
  `,
  MarginWidthDiv = styled.div`
    margin: 15px 0px;
    width: 100%;
  `,
  ProviderFlex = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  ProviderWidth = styled.div`
    width: 324px;
  `,
  translateXRightToLeft = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
`,
  SlideDiv = styled.div<{
    mounted?: boolean
  }>`
    position: absolute;
    z-index: 10;
    background-color: #fafafa;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
    width: 536px;
    padding: 32px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.12),
      0px 1px 32px rgba(0, 0, 0, 0.06);
    margin: 0px;
    animation:  ${translateXRightToLeft} .3s linear};
  `
