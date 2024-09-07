import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { StyledButton } from './CustumButton.styled'
/* the StyledButton is the styled-component for our button. This button has default styles as well as props that can be used to further customize its apprience including with and height */

/* This reusable button requires children in the form of a react node and an onClick handler. */
interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: any) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?:
    | 'primary'
    | 'warning'
    | 'green'
    | 'grey'
    | 'back'
    | 'clear'
    | 'upload'
    | 'nobg'
    | 'clearGreen'
    | 'nobgGreen'
    | 'transparentClear'
  size?: 'sm' | 'md' | 'mdwide' | 'lg' | 'xl' | 'fit'
  fontSize?: string
  overrideWidth?: string
  overrideHeight?: string
  overrideHover?: string
  disabled?: boolean
}

/* this pattern is used in compination with styled-components to handle our button styles. This function returns the following
[backgroundColor, color, border, hoverColor]
*/
function getButtonStyleProps(variant: string, themeContext: any) {
  switch (variant) {
    case 'primary':
      return [themeContext.colors.brandPrimary, 'black', 'none', '#51dbcd']
    case 'warning':
      return ['#E0312E', 'white', 'none', '#CF2020']
    case 'green':
      return ['#007e75', 'white', 'none', '#007e75']
    case 'grey':
      return ['#0408090d', 'black', 'none', '#04080926']
    case 'back':
      return ['none', 'black', 'none', '#ebecec']
    case 'clear':
      return ['transparent', '#BA1A1A', 'none', '#fdecea']
    case 'transparentClear':
      return ['transparent', 'black', 'none', '#d8edeb']
    case 'clearGreen':
      return [
        themeContext.colors.background,
        themeContext.colors.brandPrimary,
        'none',
        '#c4e4e4',
      ]

    case 'upload':
      return ['white', 'black', '1px solid', '#f7f7f7']
    case 'nobg':
      return ['white', 'black', 'none', '#d8edeb']
    case 'nobgGreen':
      return ['white', '#007E75', 'none', '#d8edeb']
    case 'primaryWhite':
      return [themeContext.colors.brandPrimary, 'white', 'none', '#51dbcd']
    case 'transparentNoBorder':
      return ['transparent', 'black', 'none', '#d8edeb']
    default:
      return ['transparent', 'black', '1px solid black', '#d8edeb']
  }
}
function getButtonSizeProps(size: string) {
  switch (size) {
    case 'sm':
      return ['8px 32px', '130px', '36px']
    case 'md':
      return ['12px 32px', '280px', '36px']
    case 'mdwide':
      return ['12px 32px', '300px', '36px']
    case 'lg':
      return ['12px 32px', '254px', '48px']
    case 'lgwide':
      return ['12px 32px', '520px', '48px']
    case 'xl':
      return ['12px 32px', '100%', '58px']
    case 'fit':
      return ['12px 32px', '100%', '36px']
    default:
      return ['12px 32px', 'auto', 'auto']
  }
}

/*This is the reusable button component, 
Params: <ButtonProps>
*/
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  onClick,
  fontSize,
  size = 'sm',
  overrideWidth,
  overrideHeight,
  overrideHover,
  disabled,
  type = 'button',
}) => {
  /*this is an example of how to access the themes in /src/styles/theme.ts
  Our app color pallate will remain consistant if we use this pattern as much as possible
  */
  const themeContext = useContext(ThemeContext)
  /* invoke the getButtonStyleProps to get the remaining values for out button theme */
  const [backgroundColor, color, border, hovorColor] = getButtonStyleProps(
    variant,
    themeContext,
  )
  const [padding, width, height] = getButtonSizeProps(size)

  return (
    <StyledButton
      border={border}
      backgroundColor={disabled ? '#efefef' : backgroundColor}
      onClick={onClick}
      color={color}
      hovorColor={overrideHover ? overrideHover : hovorColor}
      width={overrideWidth ? overrideWidth : width}
      height={overrideHeight ? overrideHeight : height}
      fontSize={fontSize}
      padding={padding}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  )
}

export default Button
