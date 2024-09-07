import React, { useContext } from 'react'
import { FieldArray, useField } from 'formik'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'

import XIcon from '../icons/XIcon'
import EditIcon from '../icons/EditIcon'
import { DropDownDiv } from 'shared/select/CustomSelect.styled'
import { StatusDiv } from 'shared/status/CustomStatus.styled'

interface InputListProps {
  value: string[]
  formField: string
}

export const ListInput = styled.input<{
  width?: string
  height?: string
  backgroundColor?: string
  focusedBorderColor?: string
  fontSize?: string
  error?: boolean
}>`
  color: '#8d8d8d',
  cursor: pointer;
  font-family: 'Inter';
  border: hidden;
  outline: hidden;
  caret-color: 'black';
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};

  :focus-visible {
    outline-width: 0px;
    border: hidden;
  }
`

function InputList(props: InputListProps) {
  const { value, formField } = props
  const [field, meta] = useField(formField)
  const themeContext = useContext(ThemeContext)

  const getlabel = () => {
    switch (formField) {
      case 'attendees':
        return 'Add Attendee'
      case 'prefProviders':
        return 'Add Interpreter'
      default:
        'Add'
    }
  }

  return (
    <FieldArray
      name={`${formField}`}
      render={(arrayHelpers) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '16px',
          }}
        >
          {value?.length > 0 ? (
            value.map((attendee: string, index: number) => {
              return (
                <div key={index}>
                  <DropDownDiv
                    expanded={false}
                    height="26px"
                    style={{ padding: '4px 12px' }}
                    themeContext={themeContext}
                    backgorundColor="white"
                  >
                    <ListInput
                      backgroundColor="white"
                      fontSize="16px"
                      {...field}
                      name={`${formField}.${index}`}
                      value={field.value[index]}
                      style={{ width: '248px' }}
                    />
                    <div
                      onClick={() => arrayHelpers.remove(index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <XIcon width="14" height="14" />
                    </div>
                  </DropDownDiv>
                </div>
              )
            })
          ) : (
            <></>
          )}
          <StatusDiv backgroundColor={'none'} color={'#585858'}>
            <div onClick={() => arrayHelpers.push('')}>
              <>
                <EditIcon />
                {getlabel()}
              </>
            </div>
          </StatusDiv>
        </div>
      )}
    />
  )
}

export default InputList
