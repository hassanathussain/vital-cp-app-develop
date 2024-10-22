import styled from 'styled-components'

export const StyledLabel = styled.label`
    position: relative;

    :before {
      content: '';
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      width: 20px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill-rule='evenodd'%3E%3Cpath fill-opacity='0.6' d='M16.036 18.455l2.404-2.405 5.586 5.587-2.404 2.404zM8.5 2C12.1 2 15 4.9 15 8.5S12.1 15 8.5 15 2 12.1 2 8.5 4.9 2 8.5 2zm0-2C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zM15 16a1 1 0 1 1 2 0 1 1 0 1 1-2 0'%3E%3C/path%3E%3C/svg%3E")
        center / contain no-repeat;
    }
  `,
  FlexDashboard = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
  `,
  TableMargin = styled.div`
    margin: 25px 20px;
  `,
  FilterMargin = styled.div`
    margin-top: 25px;
  `
