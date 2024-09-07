import IconButton from '@mui/material/IconButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'shared/button'
import ExpaneMoreIcon from 'shared/icons/ExpandMoreIcon'
import styled from 'styled-components'

interface IPaginationProps {
  count: number
  page: number
  onPageChange: (
    event: React.MouseEvent<
      HTMLButtonElement | HTMLDivElement,
      MouseEvent
    > | null,
    newPage: number,
  ) => void
  rowsPerPage: number
}
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px;
`
const NumberDiv = styled.div`
  display: flex;
  border: 1px solid rgba(4, 8, 9, 0.08);
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`
const PageNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.9);
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 0;
`
const ConnectedButton = styled.button<{
  isRight: boolean
}>`
  padding: 10px 16px;
  outline: none;
  cursor: pointer;
  border-radius: ${({ isRight }) =>
    isRight ? '0px 5px 5px 0px' : '5px 0px 0px 5px'};
  font-family: 'Inter';
  border: 1px solid rgba(4,  8,  9,  0.21);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  &:hover {
    background: #d8edeb;
  }
  .material-symbols-outlined {
    align-content: center;
  }
`

const TablePagination = (props: IPaginationProps) => {
  const { t } = useTranslation()
  const { onPageChange, page, count, rowsPerPage } = props
  const numberOfPages = Math.ceil(count / rowsPerPage)
  const pages = Array(numberOfPages)
    .fill(0)
    .map((elem, i) => {
      return i + 1
    })
  return (
    <PaginationContainer>
      <PageNumberContainer>
        <div>{t('Page')}</div>
        <NumberDiv>{page + 1}</NumberDiv>
        <div>{t('of')} {numberOfPages}</div>
      </PageNumberContainer>
      <ButtonContainer>
        <ConnectedButton
          isRight={false}
          onClick={(e) => onPageChange(e, page - 1)}
          disabled={page === 0}
        >
          {t('Previous')}
        </ConnectedButton>

        <ConnectedButton
          isRight={true}
          onClick={(e) => onPageChange(e, page + 1)}
          disabled={page + 1 === numberOfPages}
        >
         {t('Next')}
        </ConnectedButton>
      </ButtonContainer>
    </PaginationContainer>
  )
}

export default TablePagination
