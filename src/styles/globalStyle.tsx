import { createGlobalStyle } from 'styled-components'
import theme from './themes'
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter';
    background-color: ${theme.colors.background};
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px; 
    
    ::-webkit-scrollbar { 
    display: none;  
  }
  }
 
`
export default GlobalStyle
