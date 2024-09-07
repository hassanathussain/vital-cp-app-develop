import styled from 'styled-components'
export const DateDiv = styled.div`
  padding-top: 6px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  background-color: white;
`
export const ScheduleModalContainer = styled.div`
  width: 424px;
  flex-direction: column;
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px 28px;
  gap: 24px;
  isolation: isolate;

  width: 456px;
`
export const ScheduleButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`
export const ScheduleContainer = styled.div`
  width: 100%;
  height: 268px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  overflow-y: scroll;
  gap: 8px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(4, 8, 9, 0.02), rgba(4, 8, 9, 0.02)),
    #ffffff;
  border: 1px solid rgba(4, 8, 9, 0.08);
`
export const ScheduleDiv = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  background: white;
  padding: 8px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid rgba(4, 8, 9, 0.08);
`
