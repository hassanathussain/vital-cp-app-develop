import { useField, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { StyledContainer, StyledText } from './checkbox.styled'

interface Props {
  name: string
  label: string
}

function Checkbox2(props: Props) {
  const { name, label } = props
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers
  const checked = field.value

  const formik: any = useFormikContext()
  
   //formik setters
   const setLocationId = formik.getFieldHelpers('locationId').setValue
   const setAddress1 = formik.getFieldHelpers('address1').setValue
   const setAddress2 = formik.getFieldHelpers('address2').setValue
   const setCity = formik.getFieldHelpers('city').setValue
   const setState = formik.getFieldHelpers('state').setValue
   const setZip = formik.getFieldHelpers('zipCode').setValue
   const setCountry = formik.getFieldHelpers('country').setValue


  return (
    <StyledContainer>
      {checked ? (
        <svg
          onClick={() => {
            setValue(!checked)
          }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            fill="#51DBCD"
            fillOpacity="0.15"
          />
          <path
            d="M12 5L6.5 10.5L4 8"
            stroke="#28BFB2"
            strokeWidth="1.6666"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            stroke="#28BFB2"
          />
        </svg>
      ) : (
        <svg
          onClick={() => {
            setValue(!checked)
            setLocationId(null)
            setAddress1("")
            setAddress2("")
            setCity("")
            setState("")
            setZip("")
            setCountry("")

          }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            fill="black"
            fillOpacity="0.06"
          />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            stroke="white"
          />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            stroke="black"
            strokeOpacity="0.12"
          />
        </svg>
      )}
      <StyledText>{label}</StyledText>
    </StyledContainer>
  )
}

export default Checkbox2
