import React, { useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'

import Status from '../status'
import ExpaneMoreIcon from '../icons/ExpandMoreIcon'
import CustomDates from '../dates/CustomDates'
import { CheckBoxDiv, DropDownDiv } from './CustomSelect.styled'
import { t } from 'i18next'

export interface CheckboxSelectProps {
  name: string
  id: number
  options: string[]
  handleChange: (e: any) => void
  isMultiSelect: boolean
  CustomDate?: boolean
  customDateChange?: any
  expanded: boolean
  setExpanded: () => void
  selectedBoxs: boolean[]
  setSelectedBoxs: (selected: boolean[]) => void
  collapseAll?: () => void
  expandedDateRange: boolean
  setExpandedDateRange: (expanded: boolean) => void
}

function Select({
  name,
  options,
  handleChange,
  isMultiSelect = false,
  CustomDate,
  customDateChange,
  setExpanded,
  expanded,
  selectedBoxs,
  setSelectedBoxs,
  collapseAll,
  id,
  expandedDateRange,
  setExpandedDateRange,
}: CheckboxSelectProps) {
  const defaultSelection = new Array(options.length + 1).fill(false)
  const [dateRange, setDateRange] = useState<Dayjs[]>([])
  const [placeholderText, setPlaceholderText] = useState<string>(name)

  const handleElseWhereClick = (event: any) => {
    const concernedElement = document.querySelector(`.filters-${id}`)
    if (!concernedElement?.contains(event?.target)) {
      collapseAll ? collapseAll() : null
      document.removeEventListener('mousedown', handleElseWhereClick)
    }
  }
  function showCheckboxes() {
    if (!expanded) {
      document.addEventListener('mousedown', handleElseWhereClick)
      setExpanded()
    } else {
      setExpanded()
    }
  }

  function handleCheckBoxClick(e: any, i: number) {
    if (isMultiSelect) {
      const selected = selectedBoxs.map((box, j) => {
        if (i === j) {
          return !selectedBoxs[j]
        } else {
          return selectedBoxs[j]
        }
      })
      setSelectedBoxs(selected)
      if (!selected.includes(true)) {
        setSelectedBoxs(defaultSelection)
        handleChange(undefined)
      } else handleChange(selected)
    } else {
      setSelectedBoxs(
        selectedBoxs.map((box, j) => {
          if (i === j) {
            if (!selectedBoxs[j]) handleChange(e.target.value)
            else handleChange(undefined)
            return !selectedBoxs[j]
          } else {
            return false
          }
        }),
      )
      CustomDate ? (i !== 6 ? setExpandedDateRange(false) : null) : null
    }
  }
  function getPlaceHolderText() {
    if (isMultiSelect) {
      const chosen: string[] = []
      if (!selectedBoxs.includes(true)) setPlaceholderText(name)
      else {
        options.forEach((elem, i) => {
          if (selectedBoxs[i]) chosen.push(t(elem))
        })
        let returnedString = `${name}`
        if (chosen[0]) returnedString += `: ${chosen[0]}`
        if (chosen[1]) returnedString += `, ${chosen[1]}`
        if (chosen.length > 2) returnedString += `, +${chosen.length - 2}`
        setPlaceholderText(returnedString)
      }
    } else {
      if (CustomDate && selectedBoxs[6])
        setPlaceholderText(`${name}: ${t('Custom Range')}`)
      if (!selectedBoxs.includes(true)) setPlaceholderText(name)
      else {
        options.forEach((elem, i) => {
          if (selectedBoxs[i]) setPlaceholderText(`${name}: ${elem}`)
        })
      }
    }
  }
  useEffect(() => {
    getPlaceHolderText()
  }, [selectedBoxs])

  function hadleCustomDateClick(e: any) {
    e.preventDefault()
    if (e.target.id === 'customDate-radio') {
      setExpandedDateRange(true)
    }
    setSelectedBoxs(
      selectedBoxs.map((box, i) => {
        if (i === options.length) {
          return true
        } else {
          return false
        }
      }),
    )
  }

  return (
    <>
      <form>
        <div>
          <DropDownDiv
            expanded={expanded}
            hoverColor="#d9d9d9"
            onClick={showCheckboxes}
            style={{ fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            {placeholderText}
            <ExpaneMoreIcon size={{ width: 8, height: 6 }} />
          </DropDownDiv>
          <CheckBoxDiv expanded={expanded}>
            <>
              {options?.map((option: any, i: number) => {
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 0px',
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: '6px',
                      }}
                    >
                      <input
                        type={isMultiSelect ? 'checkbox' : 'radio'}
                        style={{
                          cursor: 'pointer',
                        }}
                        value={option}
                        checked={selectedBoxs[i]}
                        onClick={(e) => handleCheckBoxClick(e, i)}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onChange={() => {}}
                      />
                      {name === 'Status' ? (
                        <Status status={option} />
                      ) : (
                        <span style={{ fontWeight: 600 }}>{t(option)}</span>
                      )}
                    </label>
                  </div>
                )
              })}
              {CustomDate ? (
                <div
                  style={{
                    padding: '10px 0px',
                  }}
                >
                  <label style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="radio"
                      id="customDate-radio"
                      value={undefined}
                      checked={selectedBoxs[options.length]}
                      onChange={(e) => hadleCustomDateClick(e)}
                    />
                    <div onClick={(e) => hadleCustomDateClick(e)}>
                      <CustomDates
                        customDateChange={customDateChange}
                        dates={dateRange}
                        setDates={setDateRange}
                        collapseAll={collapseAll}
                        expanded={expandedDateRange}
                        setExpanded={setExpandedDateRange}
                      />
                    </div>
                  </label>
                </div>
              ) : (
                <></>
              )}
            </>
          </CheckBoxDiv>
        </div>
      </form>
    </>
  )
}

export default Select
