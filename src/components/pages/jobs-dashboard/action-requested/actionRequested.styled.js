import styled from 'styled-components';

export const ActionCard = styled.div`
     background: #ffffff;
     padding: 25px;
     border-radius: 5px;
     font-family: 'Inter';
     border: 2px solid #e9e9e9;
     width: 90%;
     display: flex;
     flex-direction: column;
     border-radius: 10px;
     background-color: #f5f5f5;
    
     .material-symbols-outlined {
          height: 10px;
          align-content: center;
          font-size: 20px;
    }
`, IconFont = styled.div`
     font-weight: 600;
     font-size: 19px;
     line-height: 24px;
     display: flex;
     align-items: center;
     gap: 8px;
`, DescriptiveParagraph = styled.p`
     font-size: 16px;
     line-height: 24px;
     font-weight: 400;
`, WidthHr = styled.hr`
     width: 100%;
`, ActionWrapper = styled.div`
     margin: 16px 0px;
     display: flex;
     justify-content: space-between;
     font-weight: 800;
     font-size: 14px;
     line-height: 18px;
`