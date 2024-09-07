import React from 'react'
function ExpaneMoreIcon(props: any) {
  const { size, color } = props
  return (
    <svg
      className="icon"
      width={size ? size.width : 12}
      height={size ? size.height : 8}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke={color ? color : 'black'}
        opacity="0.6"
        strokeWidth="1.66667"
      />
    </svg>
  )
}

export default ExpaneMoreIcon
