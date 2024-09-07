import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { StyledDataCard, TitleDiv } from './dataCard.styled'
import { ICardRowProps, IDataCardProps } from 'models/jobDashboard'
import DataCardRow from './DataCardRow'
import ExpaneMoreIcon from 'shared/icons/ExpandMoreIcon'
import { IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import Button from 'shared/button'
import { t } from 'i18next'
import { useFormik, useFormikContext } from 'formik'
import { IJobFormValues } from '../../job-details/JobDetailsForm'

// eslint-disable-next-line @typescript-eslint/ban-types
const NewDataCard = (props: IDataCardProps) => {
  const {
    title,
    rows,
    toggleScheduleModal,
    isEditMode,
    viewMode,
    jobId,
    activityId,
  } = props
  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => setExpanded(!expanded)

  const themeContext = useContext(ThemeContext)
  const values = useFormikContext().values as IJobFormValues
  return (
    <StyledDataCard ThemeContext={themeContext}>
      <TitleDiv>
        <div>{title}</div>
        <div
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <IconButton onClick={toggleExpanded}>
            <ExpaneMoreIcon />
          </IconButton>
        </div>
      </TitleDiv>
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="rowsDiv"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '12px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {rows?.map((row: ICardRowProps, i: number) => {
              return (
                <DataCardRow
                  jobId={jobId}
                  activityId={activityId}
                  label={row.label}
                  forms={row.forms}
                  key={i}
                  isEditMode={isEditMode}
                  viewMode={viewMode}
                />
              )
            })}
            {title === 'Time' &&
              isEditMode &&
              (viewMode == 'series' ||
                (viewMode === 'single' && values.repeats !== 0)) && (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    variant="grey"
                    size="mdwide"
                    onClick={toggleScheduleModal}
                  >
                    {t('View Schedule')}
                  </Button>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </StyledDataCard>
  )
}

export default NewDataCard
