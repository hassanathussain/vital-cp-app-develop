import IconButton from '@mui/material/IconButton'
import dayjs from 'dayjs'
import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'
import EyeIcon from 'shared/icons/EyeIcon'
import { JobViewProps } from 'src/components/pages/job-details/JobView'
import styled from 'styled-components'

const StyledCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 8px 12px 16px;
  gap: 16px;
  background: #ffffff;
  border: 1px solid rgba(4, 8, 9, 0.08);
  border-radius: 8px;
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const StyledError = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ba1a1a;
`

const StyledDate = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
`

interface Props {
  activityId: number
  jobId: number
  requestedTitle: string
  errMsj: string | null
  date: string
  setJobViewInfo: Dispatch<SetStateAction<JobViewProps | null>>
  setIsOpen: Dispatch<SetStateAction<boolean>> | undefined
  handleClose: (e: any) => void
}

function ModalCard(props: Props) {
  const {
    requestedTitle,
    date,
    errMsj,
    activityId,
    jobId,
    setIsOpen,
    setJobViewInfo,
    handleClose,
  } = props
  return (
    <StyledCard>
      <StyledHeader>
        <div>
          {requestedTitle}
          <StyledDate>{dayjs(date)?.format('dddd, MMMM D')}</StyledDate>
        </div>
        <IconButton
          edge="start"
          color="inherit"
          onClick={(e) => {
            e.stopPropagation()
            handleClose(e)
            setIsOpen && setIsOpen(true)
            setJobViewInfo({
              jobId: jobId,
              activityId: activityId,
              viewMode: 'event',
              enterInEditMode: false,
              canEdit: false,
              canCancel: false,
            })
          }}
          aria-label="close"
        >
          <EyeIcon />
        </IconButton>
      </StyledHeader>
      <StyledError>{errMsj}</StyledError>
    </StyledCard>
  )
}

export default ModalCard
