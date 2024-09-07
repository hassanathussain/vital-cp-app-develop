import React from 'react'
import {
  DivFont,
  FlexAlign,
  FlexAndJustify,
  FlexDetails,
  Paragrapgh12Font,
  ParagraphFont,
  XIconAlign,
} from './jobDetails.styled'

import Button from 'shared/button'
import { IconButton } from '@mui/material'
import XIcon from 'shared/icons/XIcon'
import { t } from 'i18next'
import Status from 'shared/status'
import { Dayjs } from 'dayjs'

interface IHeaderProps {
  id: string
  requestCreatedDate: Dayjs
  handleClose: () => void
  requestTitle: string
  isDetailView: boolean
  setIsDetailView: React.Dispatch<React.SetStateAction<boolean>>
  requestedByName: string
  status: string
}
const JobViewHeader = (props: IHeaderProps) => {
  const {
    requestCreatedDate,
    handleClose,
    id,
    requestTitle,
    isDetailView,
    setIsDetailView,
    requestedByName,
    status,
  } = props
  const translateDate = (date: Dayjs) => {
    return date.format('MMM D, YYYY h:mm A')
  }
  const translatedDate = translateDate(requestCreatedDate)

  return (
    <>
      <XIconAlign>
        <IconButton onClick={handleClose} aria-label="close">
          <XIcon width="20px" height="20px" />
        </IconButton>
      </XIconAlign>
      <FlexDetails>
        <FlexAlign>
          <ParagraphFont>{id}</ParagraphFont>
          <DivFont>{requestTitle}</DivFont>
        </FlexAlign>
        {isDetailView && (
          <>
            <FlexAndJustify isDetailView>
              <div>
                <Paragrapgh12Font>{t('Request Created')}</Paragrapgh12Font>
                <div
                  style={{
                    fontSize: '13px',
                  }}
                >
                  {translatedDate}
                </div>
              </div>
              <div>
                <Paragrapgh12Font>{t('Request By')}</Paragrapgh12Font>
                <div
                  style={{
                    fontSize: '13px',
                  }}
                >
                  {requestedByName}
                </div>
              </div>
              <div>
                <Paragrapgh12Font>{t('Status')}</Paragrapgh12Font>
                <Status status={status} />
              </div>
            </FlexAndJustify>
          </>
        )}
        <FlexAndJustify>
          <div>
            <Button
              variant={isDetailView ? 'green' : 'grey'}
              onClick={() => setIsDetailView(!isDetailView)}
              size="md"
              overrideWidth="252px"
            >
              {t('Details')}
            </Button>
          </div>
          <div>
            <Button
              size="md"
              overrideWidth="252px"
              variant={!isDetailView ? 'green' : 'grey'}
              onClick={() => setIsDetailView(!isDetailView)}
            >
              {t('Schedule')}
            </Button>
          </div>
        </FlexAndJustify>
      </FlexDetails>
    </>
  )
}

export default JobViewHeader
