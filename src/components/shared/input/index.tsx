import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { StyledInput } from './input.styled'
interface InputProps {
  value: string
  setValue?: (event: any) => void
  placeholder?: string
  type?: string
  fontSize?: string
  backgroundColor?: string
  borderColor?: string
  positionIconAtEnd?: boolean
  size?: 'sm' | 'md' | 'lg'
  padding?: string
  error?: boolean
}

/* this pattern is used in compination with styled-components to handle our button styles. This function returns the following
[backgroundColor, color, border, hoverColor]
*/

function getSizeProps(size: string) {
  switch (size) {
    case 'lg':
      return ['280px', '35px']
    case 'md':
      return ['255px', '30px']
    case 'sm':
      return ['104px', '20px']
    default:
      return ['auto', 'auto']
  }
}
const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  backgroundColor,
  borderColor,
  size = '',
  type = 'text',
  fontSize,
  padding,
  error,
}) => {
  const themeContext = useContext(ThemeContext)
  const [width, height] = getSizeProps(size)
  function handleChange(event: any) {
    setValue && setValue(event)
  }

  return (
    <StyledInput
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      ThemeContext={themeContext}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      fontSize={fontSize}
      padding={padding}
      error={error}
    ></StyledInput>
  )
}

export default Input
