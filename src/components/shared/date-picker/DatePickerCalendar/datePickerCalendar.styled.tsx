import styled from 'styled-components'

export const CalendarCellDiv = styled.div`
  padding: 4px;
  width: 40px;
  height: 40px;
  margin: 0 2px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const DayCellDiv = styled.div<{
  isSelected?: boolean
  isInRange?: boolean
  isInMonth?: boolean
  isStartDate?: boolean
  isEndDate?: boolean
}>`
  width: 40px;
  height: 40px;
  border-radius: ${({ isInRange, isStartDate, isEndDate }) =>
    isInRange
      ? '0px'
      : isStartDate
      ? '50% 0% 0% 50%'
      : isEndDate
      ? '0% 50% 50% 0%'
      : '20px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#00A297' : 'white')};
  background-color: ${({ isInRange }) => (isInRange ? '#ddf8f5' : '')};
  color: ${({ isSelected }) => (!isSelected ? 'black' : 'white')};
  opacity: ${({ isInMonth, isSelected, isInRange }) =>
    isInMonth || isSelected || isInRange ? 1 : 0.6};
  :hover {
    background: ${({ isSelected }) => (!isSelected ? '#51DBCD' : '')};
  }
`
