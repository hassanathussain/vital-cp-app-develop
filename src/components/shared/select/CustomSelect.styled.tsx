import styled from 'styled-components'

export const CheckBoxDiv = styled.div<{
  expanded: boolean
}>`
  position: absolute;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  background: #fff;
  margin-top: 6px;
  width: fit-content;
  border: none;
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 8px;
  padding: 5px 10px;
  cursur: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  &label {
    display: block;
  }
`
export const DropDownDiv = styled.div<{
  expanded: boolean
  width?: string
  height?: string
  backgorundColor?: string
  fontSize?: string
  iconSize?: string
  themeContext?: any
  hoverColor?: string
  error?: boolean
  value?: boolean
}>`
  display: flex;
  justify-content:space-between ;
  align-items: center;
  outline: none;
  border: ${({ themeContext, expanded, error }) =>
    themeContext?.colors?.brandPrimary && expanded
      ? `1px solid ${
          !error
            ? themeContext?.colors?.brandPrimary
            : themeContext?.colors?.red
        }`
      : `1px solid ${!error ? '#d9d9d9' : themeContext?.colors?.red}`};
  color: ${({ value }) => (value ? 'black' : 'grey')};
  cursor: pointer;
  border-radius: 8px;
  background:  ${({ backgorundColor }) =>
    backgorundColor ? backgorundColor : '#ebebeb'};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width ${({ width }) => (width ? width : 'auto')};
  height ${({ height }) => (height ? height : 'auto')};
  flex-direction: row;
  padding: 4px 12px;
  gap: 8px;
  font-weight: 500;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '12px')};
  line-height: 18px;
  white-space: nowrap;
  overflow:hidden;
 
  &:hover {
    background: ${({ hoverColor }) => (hoverColor ? hoverColor : '')};
  }
  .icon {
    transform: ${({ expanded }) => (expanded ? 'rotate(180deg)' : 'none')};
    align-content: center;
    font-size: ${({ iconSize }) => (iconSize ? iconSize : '12px')};
    opacity: 0.6;
  }
`
export const SelectDiv = styled.div<{
  expanded: boolean
  width?: string
}>`
position: absolute;
display: ${({ expanded }) => (expanded ? 'balck' : 'none')};
background: #fff;
margin-top: 6px;
width: fit-content;
border: none;
box-shadow: 0 0 10px #d9d9d9;
border-radius: 4px;
padding: 5px;
cursur: pointer;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
z-index: 10;
max-height: 330px;
overflow-x:hidden;
cursor: pointer;
 
::-webkit-scrollbar {
  display: none;  
}
width ${({ width }) => (width ? width : 'auto')};
 
&label {
  display: block;
}
`
