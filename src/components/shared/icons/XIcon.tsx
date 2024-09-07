import React from 'react'
function XIcon({
  width,
  height,
  fill,
}: {
  width: string
  height: string
  fill?: string
}) {
  return (
    <svg
      className="icon"
      width={width ? width : '24'}
      height={height ? height : '24'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5286 3.5286C3.78895 3.26825 4.21105 3.26825 4.4714 3.5286L8 7.05719L11.5286 3.5286C11.7889 3.26825 12.2111 3.26825 12.4714 3.5286C12.7318 3.78895 12.7318 4.21105 12.4714 4.4714L8.94281 8L12.4714 11.5286C12.7318 11.7889 12.7318 12.2111 12.4714 12.4714C12.2111 12.7318 11.7889 12.7318 11.5286 12.4714L8 8.94281L4.4714 12.4714C4.21105 12.7318 3.78895 12.7318 3.5286 12.4714C3.26825 12.2111 3.26825 11.7889 3.5286 11.5286L7.05719 8L3.5286 4.4714C3.26825 4.21105 3.26825 3.78895 3.5286 3.5286Z"
        fill={fill ? fill : 'black'}
        opacity="0.6"
      />
    </svg>
  )
}

export default XIcon
