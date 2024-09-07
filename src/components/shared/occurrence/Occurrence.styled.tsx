import styled from 'styled-components'

export const OccurrenceDiv = styled.div<{
  width: string
}>`
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  width: ${({ width }) => (width ? width : '326px')};
  border: 1px solid #d9d9d9;
  height: 40px;
  align-items: center;
`
export const DayDiv = styled.div<{
  selected?: boolean
  isLast?: boolean
  isFirst?: boolean
}>`
  background: ${({ selected }) => (selected ? '#51DBCD' : '')};
  width: 100%;
  height: 100%;
  border-radius: ${({ isFirst, isLast }) =>
    isLast ? '0px 8px 8px 0px' : isFirst ? '8px 0px 0px 8px' : ''};
  border-right: ${({ isLast }) => (isLast ? '' : '1px solid #d9d9d9')};
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: ${({ selected }) => (!selected ? '#dbf0ef' : '')};
  }
`
