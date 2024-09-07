import React from 'react'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import ExpaneMoreIcon from '../icons/ExpandMoreIcon'
import { ThemeContext } from 'styled-components'
import { DropDownDiv, SelectDiv } from 'shared/select/CustomSelect.styled'

export interface ITimePickerProps {
  value: Dayjs
  error?: boolean
  name: string
  onChange: (newDate: Dayjs) => void
}
function TimePicker(props: ITimePickerProps) {
  const { value, onChange, error, name } = props
  const themeContext = React.useContext(ThemeContext)
  const [expanded, setExpanded] = useState(false)
  const handleElseWhereClick = (event: any) => {
    const concernedElement = document.querySelector(`.timepicker-${name}`)
    if (concernedElement?.contains(event?.target)) {
      document.removeEventListener('mousedown', handleElseWhereClick)
    } else {
      document.removeEventListener('mousedown', handleElseWhereClick)
      setExpanded(false)
    }
  }

  function toggleExpand() {
    if (!expanded) {
      document.addEventListener('mousedown', handleElseWhereClick)
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }
  const timeOptions = [
    dayjs().hour(0).minute(0).second(0),
    dayjs().hour(0).minute(15).second(0),
    dayjs().hour(0).minute(30).second(0),
    dayjs().hour(0).minute(45).second(0),
    dayjs().hour(1).minute(0).second(0),
    dayjs().hour(1).minute(15).second(0),
    dayjs().hour(1).minute(30).second(0),
    dayjs().hour(1).minute(45).second(0),
    dayjs().hour(2).minute(0).second(0),
    dayjs().hour(2).minute(15).second(0),
    dayjs().hour(2).minute(30).second(0),
    dayjs().hour(2).minute(45).second(0),
    dayjs().hour(3).minute(0).second(0),
    dayjs().hour(3).minute(15).second(0),
    dayjs().hour(3).minute(30).second(0),
    dayjs().hour(3).minute(45).second(0),
    dayjs().hour(4).minute(0).second(0),
    dayjs().hour(4).minute(15).second(0),
    dayjs().hour(4).minute(30).second(0),
    dayjs().hour(4).minute(45).second(0),
    dayjs().hour(5).minute(0).second(0),
    dayjs().hour(5).minute(15).second(0),
    dayjs().hour(5).minute(30).second(0),
    dayjs().hour(5).minute(45).second(0),
    dayjs().hour(6).minute(0).second(0),
    dayjs().hour(6).minute(15).second(0),
    dayjs().hour(6).minute(30).second(0),
    dayjs().hour(6).minute(45).second(0),
    dayjs().hour(7).minute(0).second(0),
    dayjs().hour(7).minute(15).second(0),
    dayjs().hour(7).minute(30).second(0),
    dayjs().hour(7).minute(45).second(0),
    dayjs().hour(8).minute(0).second(0),
    dayjs().hour(8).minute(15).second(0),
    dayjs().hour(8).minute(30).second(0),
    dayjs().hour(8).minute(45).second(0),
    dayjs().hour(9).minute(0).second(0),
    dayjs().hour(9).minute(15).second(0),
    dayjs().hour(9).minute(30).second(0),
    dayjs().hour(9).minute(45).second(0),
    dayjs().hour(10).minute(0).second(0),
    dayjs().hour(10).minute(15).second(0),
    dayjs().hour(10).minute(30).second(0),
    dayjs().hour(10).minute(45).second(0),
    dayjs().hour(11).minute(0).second(0),
    dayjs().hour(11).minute(15).second(0),
    dayjs().hour(11).minute(30).second(0),
    dayjs().hour(11).minute(45).second(0),
    dayjs().hour(12).minute(0).second(0),
    dayjs().hour(12).minute(15).second(0),
    dayjs().hour(12).minute(30).second(0),
    dayjs().hour(12).minute(45).second(0),
    dayjs().hour(13).minute(0).second(0),
    dayjs().hour(13).minute(15).second(0),
    dayjs().hour(13).minute(30).second(0),
    dayjs().hour(13).minute(45).second(0),
    dayjs().hour(14).minute(0).second(0),
    dayjs().hour(14).minute(15).second(0),
    dayjs().hour(14).minute(30).second(0),
    dayjs().hour(14).minute(45).second(0),
    dayjs().hour(15).minute(0).second(0),
    dayjs().hour(15).minute(15).second(0),
    dayjs().hour(15).minute(30).second(0),
    dayjs().hour(15).minute(45).second(0),
    dayjs().hour(16).minute(0).second(0),
    dayjs().hour(16).minute(15).second(0),
    dayjs().hour(16).minute(30).second(0),
    dayjs().hour(16).minute(45).second(0),
    dayjs().hour(17).minute(0).second(0),
    dayjs().hour(17).minute(15).second(0),
    dayjs().hour(17).minute(30).second(0),
    dayjs().hour(17).minute(45).second(0),
    dayjs().hour(18).minute(0).second(0),
    dayjs().hour(18).minute(15).second(0),
    dayjs().hour(18).minute(30).second(0),
    dayjs().hour(18).minute(45).second(0),
    dayjs().hour(19).minute(0).second(0),
    dayjs().hour(19).minute(15).second(0),
    dayjs().hour(19).minute(30).second(0),
    dayjs().hour(19).minute(45).second(0),
    dayjs().hour(20).minute(0).second(0),
    dayjs().hour(20).minute(15).second(0),
    dayjs().hour(20).minute(30).second(0),
    dayjs().hour(20).minute(45).second(0),
    dayjs().hour(21).minute(0).second(0),
    dayjs().hour(21).minute(15).second(0),
    dayjs().hour(21).minute(30).second(0),
    dayjs().hour(21).minute(45).second(0),
    dayjs().hour(22).minute(0).second(0),
    dayjs().hour(22).minute(15).second(0),
    dayjs().hour(22).minute(30).second(0),
    dayjs().hour(22).minute(45).second(0),
    dayjs().hour(23).minute(0).second(0),
    dayjs().hour(23).minute(15).second(0),
    dayjs().hour(23).minute(30).second(0),
    dayjs().hour(23).minute(45).second(0),
  ]

  return (
    <div className={`timepicker-${name}`}>
      <DropDownDiv
        height={'26px'}
        expanded={expanded}
        onClick={toggleExpand}
        backgorundColor={'white'}
        fontSize="16px"
        value={value ? true : false}
        themeContext={themeContext}
        error={error ? error : false}
      >
        {value.format('h:mm A')} <ExpaneMoreIcon />
      </DropDownDiv>
      <SelectDiv expanded={expanded} width={'106px'}>
        {timeOptions?.map((option: any, i: number) => {
          function handleClick() {
            toggleExpand()
            onChange(option)
          }
          return (
            <div
              key={i}
              style={{
                padding: '10px 0px',
                lineHeight: '20px',
                fontSize: '16px',
                fontWeight: 500,
              }}
              onClick={handleClick}
            >
              {option.format('h:mm A')}
            </div>
          )
        })}
      </SelectDiv>
    </div>
  )
}

export default TimePicker
