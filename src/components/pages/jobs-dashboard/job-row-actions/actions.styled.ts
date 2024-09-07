import styled from 'styled-components';

export const FlexWrapper = styled.div<{yesGap?: any}>`
     display: flex;
     gap: ${props => props.yesGap && '8px'};
`, FlexChildrenMargin = styled.div`
     margin: 8px;
`;
