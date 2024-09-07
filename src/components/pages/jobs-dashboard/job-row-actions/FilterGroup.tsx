import dayjs, { Dayjs } from 'dayjs'
import React, { Dispatch, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'shared/select/MainSelect'

type Filter = {
  name: string
  options: string[]
  isMultiSelect?: boolean
  customDate?: boolean
  id: number
}
type FilterGroupProps = {
  filters: Filter[]
  values: any
  setValues: Dispatch<any>
}

function FilterGroup(props: FilterGroupProps) {
  const { t } = useTranslation()
  const { filters, values, setValues } = props
  const [expandedDateRange, setExpandedDateRange] = React.useState(false)
  const [expansionState, setExpandedState] = useState(
    Array(filters.length).fill(false),
  )
  const clearValues = () => {
    setExpandedDateRange(false)
    setExpandedState(Array(filters.length).fill(false))
    setValues(Array(values.length).fill(undefined))
  }
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      {filters?.map((filter: Filter, i: number) => {
        const defaultSelection = new Array(filter.options.length + 1).fill(
          false,
        )
        const [selectedBoxs, setSelectedBoxs] = useState(defaultSelection)

        useEffect(() => {
          if (!values[0] && !values[1] && !values[2])
            setSelectedBoxs(defaultSelection)
        }, [values])

        const isMultiSelect = filter.isMultiSelect
          ? filter.isMultiSelect
          : false

        const handleChange = (newValue: string | undefined) => {
          setValues(
            values.map((value: any, j: number) => {
              if (i === j) return newValue
              else {
                return value
              }
            }),
          )
        }
        function handleSetExpansion() {
          setExpandedState(
            expansionState.map((value: any, j: number) => {
              if (i === j) return !value
              else {
                return false
              }
            }),
          )
        }
        function collapseAll() {
          setExpandedState(expansionState.map((value) => false))
        }
        const handleMultiSelectChange = (newValue: boolean[]) => {
          const selectedFilters = values.map((value: any, j: number) => {
            if (i === j) {
              if (newValue === undefined) return newValue
              return filter.options.filter((option: any, i: number) => {
                if (newValue[i]) {
                  return option
                }
              })
            } else {
              return value
            }
          })
          setValues(selectedFilters)
        }
        const customDateChange = (newValue: Dayjs[]) => {
          const selectedFilters = values.map((value: any, i: number) => {
            if (i === 0) {
              return newValue
            } else {
              return value
            }
          })
          setValues(selectedFilters)
        }

        return (
          <div key={i} className={`filters-${filter.id}`}>
            <Select
              name={filter.name}
              id={filter.id}
              options={filter.options}
              handleChange={
                isMultiSelect ? handleMultiSelectChange : handleChange
              }
              isMultiSelect={isMultiSelect}
              CustomDate={filter.customDate}
              customDateChange={customDateChange}
              expanded={expansionState[i]}
              setExpanded={handleSetExpansion}
              selectedBoxs={selectedBoxs}
              setSelectedBoxs={setSelectedBoxs}
              collapseAll={collapseAll}
              expandedDateRange={expandedDateRange}
              setExpandedDateRange={setExpandedDateRange}
            />
          </div>
        )
      })}
      {(values[0] || values[1] || values[2]) && (
        <div
          style={{
            fontSize: '12px',
            width: '47px',
            height: '18px',
            cursor: 'pointer',
            color: 'grey',
            marginLeft: '8px',
          }}
          onClick={clearValues}
        >
          {t('Clear all')}
        </div>
      )}
    </div>
  )
}

export default FilterGroup
