import { StyledTextarea } from '../../../shared/input/textarea.styled'
import React, { useContext, useEffect, useState, Dispatch } from 'react'
import { useField, useFormik, useFormikContext } from 'formik'
import { ThemeContext } from 'styled-components'
import EditIcon from '../../../shared/icons/EditIcon'
import RecurrenceDetailsModal, {
  IRecurringDetails,
} from '../../../shared/modals/RecurrenceDetailsModal'
import dayjs, { Dayjs } from 'dayjs'
import { RRule, RRuleSet } from 'rrule'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Button from 'shared/button'
import SchedulesModal from 'shared/modals/SchedulesModal'
import { SetStateAction } from 'react'
import { GetFormattedRRuleText } from 'utils/rrule'
import { useTranslation } from 'react-i18next'
dayjs.extend(localizedFormat)

interface IRecurringDetailsTextAreaProps {
  showDetailsModal: boolean
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>
  setDatesToExclude: (date: Dayjs[]) => void
  endDate: Dayjs | null
  setEndDate: (date: Dayjs) => void
  datesToExclude: Dayjs[]
}
function RecurringDetailsTextArea(props: IRecurringDetailsTextAreaProps) {
  const { t } = useTranslation()
  const {
    showDetailsModal,
    setShowDetailsModal,
    setDatesToExclude,
    endDate,
    setEndDate,
    datesToExclude,
  } = props
  const formik = useFormikContext()
  const [text, setText] = useState<string>('')
  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false)

  const { values }: any = formik
  const themeContext = useContext(ThemeContext)
  useEffect(() => {
    const json = localStorage.getItem('recurrenceDetails')
    const details: IRecurringDetails | null = json && JSON.parse(json)
    if (values.rRule) {
      const tDetails = GetFormattedRRuleText(values?.rRule, details)
        ?.split(' ')
        ?.map((el) => t(el))
        ?.join(' ')
      setText(tDetails)
    } else {
      setText('')
    }
  }, [values.rRule])

  const setStartDate = formik.getFieldHelpers('startDate').setValue
  const setStartTime = formik.getFieldHelpers('startTime').setValue
  const setEndTime = formik.getFieldHelpers('endTime').setValue
  const setRecurring = formik.getFieldHelpers('recurring').setValue
  const setrRule = formik.getFieldHelpers('rRule').setValue
  //this hook will show the text area only when custum option is selected
  useEffect(() => {
    if (values?.recurring && values?.recurring !== 'Does not repeat')
      setShowTextArea(true)
    else setShowTextArea(false)
  }, [values?.recurring])

  const toggleScheduleModal = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setShowScheduleModal(!showScheduleModal)
  }
  return (
    <>
      {showTextArea && (
        <div
          style={{
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 5,
            }}
            onClick={() => setShowDetailsModal(true)}
          >
            <EditIcon />
          </span>
          <StyledTextarea
            ThemeContext={themeContext}
            rows={2}
            fontSize={'16px'}
            width="264px"
            value={text}
            disabled={true}
            style={{
              position: 'relative',
              lineHeight: '24px',
              paddingRight: '50px',
              backgroundColor: 'white',
              border: 'none',
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
          <Button variant="grey" size="mdwide" onClick={toggleScheduleModal}>
            {t('View Schedule')}
          </Button>
        </div>
      )}
      <RecurrenceDetailsModal
        open={showDetailsModal}
        setOpen={setShowDetailsModal}
        formStartDate={values.startDate}
        setFormStartDate={(date: Dayjs) => {
          setStartDate(date)
        }}
        formStartTime={values.startTime}
        setFormStartTime={(date: Dayjs) => {
          setStartTime(date)
        }}
        formEndTime={values.endTime}
        setFormEndTime={(date: Dayjs) => {
          setEndTime(date)
        }}
        setEndDate={setEndDate}
        setrRule={setrRule}
        formEndDate={endDate ? endDate : dayjs()}
        repeats={values.recurring}
        setFormRecurring={(option: string) => {
          setRecurring(option)
        }}
      />
      <SchedulesModal
        open={showScheduleModal}
        setOpen={setShowScheduleModal}
        rRule={values.rRule}
        setRRule={setrRule}
        setDatesToExclude={setDatesToExclude}
        datesToExclude={datesToExclude}
      />
    </>
  )
}

export default RecurringDetailsTextArea
