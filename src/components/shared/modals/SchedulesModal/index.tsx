import React, { useMemo, useState } from 'react'
import { Dialog } from '@mui/material'
import { RRule } from 'rrule'

import { SchedulesModalProps } from 'models/modals'
import Button from 'shared/button'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import {
  DateDiv,
  ScheduleButtonContainer,
  ScheduleContainer,
  ScheduleDiv,
  ScheduleModalContainer,
} from './SchedulesModal.styled'
import XIcon from 'shared/icons/XIcon'
import { useTranslation } from 'react-i18next'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useTimezoneData } from 'hooks/useTimezoneData'
import LocalizedES from 'dayjs/locale/es'
import { getI18nLang } from '../../../../internationalization/locale'
interface IDateOption {
  dateString: string
  value: Dayjs
}
function SchedulesModal(props: SchedulesModalProps) {
  dayjs.extend(localizedFormat)
  const timezoneData = useTimezoneData()
  const { t } = useTranslation()
  const { open, setOpen, rRule, setDatesToExclude, datesToExclude } = props
  const startHour = rRule?.options?.dtstart
    ? rRule?.options?.dtstart.getHours()
    : 12
  const [dateStrings, setDateStrings] = useState<string[]>([])
  const [allDateStrings, setAllDateStrings] = useState<IDateOption[]>([])
  const [currentDateStrings, setCurrentDateStrings] = useState<string[] | null>(
    null,
  )
  const [currentExcludedDateStrings, setCurrentExcludedDateStrings] = useState<
    Dayjs[]
  >(datesToExclude || [])
  const maxSchedulesShown = 364
  if (rRule === undefined) return <></>
  const rule = new RRule({ ...rRule.options })

  const lng = useMemo(() => getI18nLang(), [getI18nLang])

  const newDateStrings = rule
    .all((d: Date, len: number) => {
      if (len === maxSchedulesShown) return false
      return true
    })
    .map((date: Date) => {
      if (lng === 'es') {
        return {
          dateString: dayjs(date.setHours(startHour))
            .locale(LocalizedES)
            .format('llll'),
          value: dayjs(date.setHours(startHour)),
        }
      }
      return {
        dateString: dayjs(date.setHours(startHour)).format('llll'),
        value: dayjs(date.setHours(startHour)),
      }
    })

  const handleClose = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    setDates(
      currentDateStrings
        ? currentDateStrings
        : newDateStrings.map((elem) => elem.dateString),
    )
    setDatesToExclude(currentExcludedDateStrings || [])
    handleClose()
  }
  const handleReset = () => {
    setCurrentExcludedDateStrings([])
    setDatesToExclude([])
    setAllDateStrings(newDateStrings)
    setDateStrings(newDateStrings.map((elem) => elem.dateString))
  }
  const handleConfirm = () => {
    // placeholder for API DELETE request
    setCurrentDateStrings(dateStrings)
    setCurrentExcludedDateStrings(datesToExclude)

    handleClose()
  }
  const setDates = (dates: string[]) => {
    setDateStrings(dates)
  }
  useEffect(() => {
    setDates(newDateStrings.map((elem) => elem.dateString))
    setAllDateStrings(newDateStrings)
  }, [rRule])

  const getFormattedDate = (date: Dayjs) => {
    if (lng === 'es') {
      const newDate = new Date(date.format('llll'))
      newDate.setHours(startHour)
      return dayjs(newDate).locale(LocalizedES).format('llll')
    } else {
      return date.hour(startHour).format('llll')
    }
  }
  const getDateWidhoutTime = (date: Dayjs) => {
    const newDate = date.format('DD/MM/YYYY')
    return newDate
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <ScheduleModalContainer>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '19px',
              margin: '0px',
            }}
          >
            {t('Events Created')}
          </h2>
        </div>
        <ScheduleContainer>
          {allDateStrings.map((dateOption: IDateOption, i: number) => {
            const removeSchedule = (e: React.SyntheticEvent) => {
              e.preventDefault()

              const isAtLeatOneDate = dateStrings.length > 1
              if (isAtLeatOneDate) {
                setDatesToExclude([...datesToExclude, dateOption.value])
                setDateStrings(
                  dateStrings.filter(
                    (date, index) => date !== dateOption.dateString,
                  ),
                )
              } else {
                window.alert('at least one date must be selected')
              }
            }
            const addSchedule = (
              e: React.SyntheticEvent,
              dateString: string,
            ) => {
              e.preventDefault()
              setDateStrings([...dateStrings, dateString])
              setDatesToExclude(
                datesToExclude.filter(
                  (date, index) => getFormattedDate(date) !== dateString,
                ),
              )
            }
            const isExcluded = datesToExclude.find((date) => {
              return (
                getDateWidhoutTime(date) ===
                getDateWidhoutTime(dateOption.value)
              )
            })
            return (
              <ScheduleDiv key={i}>
                <DateDiv style={{ opacity: isExcluded ? '.6' : '' }}>
                  {dateOption.dateString}
                </DateDiv>
                <IconButton
                  onClick={
                    !isExcluded
                      ? (e) => removeSchedule(e)
                      : (e) => addSchedule(e, dateOption.dateString)
                  }
                  sx={{
                    transform: isExcluded ? 'rotate(45deg)' : '',
                    '&:hover': {
                      backgroundColor: isExcluded ? 'transparent' : '',
                    },
                  }}
                >
                  <XIcon width="16px" height="16px" />
                </IconButton>
              </ScheduleDiv>
            )
          })}
        </ScheduleContainer>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleReset}
            size="sm"
            overrideHeight="48px"
            overrideWidth="126px"
            overrideHover="#ebecec"
          >
            <span style={{ fontSize: '16px', fontWeight: 500 }}>
              {t('Reset')}
            </span>
          </Button>
          <ScheduleButtonContainer>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="nobg"
              overrideHeight="48px"
              overrideWidth="126px"
              overrideHover="#ebecec"
            >
              <span style={{ fontSize: '16px', fontWeight: 500 }}>
                {t('Cancel')}
              </span>
            </Button>{' '}
            <Button
              variant="primary"
              overrideHover="#00a297"
              onClick={handleConfirm}
              size="sm"
              overrideHeight="48px"
              overrideWidth="126px"
            >
              {t('Confirm')}
            </Button>
          </ScheduleButtonContainer>
        </div>
      </ScheduleModalContainer>
    </Dialog>
  )
}

export default SchedulesModal
